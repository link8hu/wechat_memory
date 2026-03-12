import { ExportBundle, Message, Platform } from "../types.js";

interface WeFlowSession {
  username: string;
  displayName?: string;
}

interface WeFlowContact {
  userName: string;
  nickName?: string;
  remark?: string;
}

interface WeFlowChatLabMessage {
  sender: string;
  timestamp: number;
  type: number;
  content?: string;
  mediaPath?: string;
}

interface WeFlowChatLabResponse {
  meta?: {
    ownerId?: string;
    name?: string;
  };
  messages?: WeFlowChatLabMessage[];
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`WeFlow API request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

function mapChatLabType(typeValue: number): Message["type"] {
  if (typeValue === 0) {
    return "text";
  }
  if (typeValue === 1) {
    return "image";
  }
  if (typeValue === 2) {
    return "voice";
  }
  return "unknown";
}

function mediaFromType(typeValue: number, mediaPath?: string): Message["media"] {
  if (typeValue === 1) {
    return { kind: "image", path: mediaPath ?? "" };
  }
  if (typeValue === 2) {
    return { kind: "voice", path: mediaPath ?? "" };
  }
  return undefined;
}

async function loadSessions(baseUrl: string, talker?: string): Promise<WeFlowSession[]> {
  if (talker) {
    return [{ username: talker, displayName: talker }];
  }

  const data = await getJson<{ sessions?: WeFlowSession[] }>(`${baseUrl}/api/v1/sessions?limit=10000`);
  return data.sessions ?? [];
}

async function loadContacts(baseUrl: string): Promise<WeFlowContact[]> {
  const data = await getJson<{ contacts?: WeFlowContact[] }>(`${baseUrl}/api/v1/contacts?limit=10000`);
  return data.contacts ?? [];
}

async function loadSessionMessages(baseUrl: string, sessionId: string): Promise<{ ownerId?: string; messages: Message[] }> {
  const messages: Message[] = [];
  let offset = 0;
  const pageSize = 1000;
  let ownerId: string | undefined;

  while (true) {
    const query = new URLSearchParams({
      talker: sessionId,
      limit: String(pageSize),
      offset: String(offset),
      chatlab: "1",
      media: "1",
      image: "1",
      voice: "1",
      video: "0",
      emoji: "0",
    });
    const data = await getJson<WeFlowChatLabResponse & { hasMore?: boolean }>(`${baseUrl}/api/v1/messages?${query.toString()}`);
    ownerId = ownerId ?? data.meta?.ownerId;
    const page = data.messages ?? [];

    for (const [index, item] of page.entries()) {
      const mappedType = mapChatLabType(item.type);
      const message: Message = {
        id: `${sessionId}:${offset + index}`,
        conversationId: sessionId,
        sender: item.sender === ownerId ? "self" : "peer",
        timestamp: item.timestamp,
        type: mappedType,
        content: item.content ?? "",
      };
      const media = mediaFromType(item.type, item.mediaPath);
      if (media) {
        message.media = media;
      }
      messages.push(message);
    }

    if (!data.hasMore || page.length === 0) {
      break;
    }
    offset += page.length;
  }

  return { ownerId, messages };
}

export interface WeFlowExportOptions {
  platform: Platform;
  baseUrl: string;
  talker?: string;
}

export async function exportFromWeFlowApi(options: WeFlowExportOptions): Promise<ExportBundle> {
  const health = await getJson<{ status?: string }>(`${options.baseUrl}/health`);
  if (health.status !== "ok") {
    throw new Error("WeFlow API is not healthy. Please start WeFlow API service in settings.");
  }

  const sessions = await loadSessions(options.baseUrl, options.talker);
  if (sessions.length === 0) {
    throw new Error("No sessions found from WeFlow API.");
  }

  const contactsRaw = await loadContacts(options.baseUrl).catch(() => []);
  const contacts = contactsRaw.map((contact) => ({
    id: contact.userName,
    displayName: contact.remark || contact.nickName || contact.userName,
  }));

  const messages: Message[] = [];
  for (const session of sessions) {
    const loaded = await loadSessionMessages(options.baseUrl, session.username);
    messages.push(...loaded.messages);
  }

  const conversations = sessions.map((session) => ({
    id: session.username,
    displayName: session.displayName || session.username,
  }));

  return {
    platform: options.platform,
    sourcePath: `${options.baseUrl} (WeFlow API)`,
    contacts,
    conversations,
    messages: messages.sort((a, b) => a.timestamp - b.timestamp),
    generatedAt: new Date().toISOString(),
  };
}
