import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";
export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECTID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DBID,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
  videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEO_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
  bookmarkId: process.env.EXPO_PUBLIC_APPWRITE_BOOKMARK_COLLECTION_ID
};

let client: Client;
let account: Account;
let avatars: Avatars;
let database: Databases;
let storage: Storage;

client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

account = new Account(client);
export async function login(email: string, password: string) {
  await account.createEmailPasswordSession(email, password);
}

export async function getCurrentUser() {
  const session = await account.getSession("current");
  if (!session) {
    return null;
  }
  const user = await database.listDocuments(
    config.databaseId,
    config.usersCollectionId,
    [Query.equal("accountId", session.userId)]
  );

  if (user.documents.length === 0) {
    return null;
  }

  return user.documents[0];
}

avatars = new Avatars(client);
database = new Databases(client);

export async function register(
  email: string,
  password: string,
  username: string
) {
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
  );
  const avatarUrl = avatars.getInitials(username);
  await login(email, password);

  const newUser = await database.createDocument(
    config.databaseId,
    config.usersCollectionId,
    ID.unique(),
    {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
    }
  );
  return newUser;
}

export async function getAllPost(userId: string) {
  const [posts, bookmarks] = await Promise.all([database.listDocuments(
    config.databaseId,
    config.videosCollectionId,
    [Query.orderDesc('$createdAt')]
  ),
  getUserBookmark(userId)
  ]);

  return posts.documents.map(p => { return { ...p, isSave: bookmarks.some(b => b.$id === p.$id) } })
}

export async function getLatestPosts() {
  const posts = await database.listDocuments(
    config.databaseId,
    config.videosCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(7)]
  );
  return posts.documents;
}

export async function searchPosts(query: string) {
  const posts = await database.listDocuments(
    config.databaseId,
    config.videosCollectionId,
    [Query.search("title", query)]
  );
  return posts.documents;
}

export async function searchBookmarkPost(userId: string, query: string) {
  const post = await database.listDocuments(
    config.databaseId, config.bookmarkId, [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
  )
  return post.documents.map(bookmark => bookmark.videoId).filter(v => v.title.includes(query));
}

export async function getUserPosts(userId: string) {
  const posts = await database.listDocuments(
    config.databaseId,
    config.videosCollectionId,
    [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
  );
  return posts.documents;
}

export async function signout() {
  const session = await account.deleteSession("current");
  return session;
}

export const createVideo = async (form) => {
  const [thumbnail, video] = await Promise.all([
    uploadFile(form.thumbnail, "image"),
    uploadFile(form.video, "video"),
  ]);

  const newPost = await database.createDocument(
    config.databaseId,
    config.videosCollectionId,
    ID.unique(),
    {
      title: form.title,
      prompt: form.prompt,
      thumbnail,
      video,
      creator: form.userId,
    }
  );
  return newPost;
};

storage = new Storage(client);

export async function uploadFile(file, type): any {
  if (!file) {
    return;
  }
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  const uploadedFile = storage.createFile(config.storageId, ID.unique(), asset);
  const fileUrl = await getFilePreview((await uploadedFile).$id, type);

  return fileUrl;
}
export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;
  if (type === "video") {
    fileUrl = storage.getFilePreview(config.storageId, fileId);
  } else if (type === "image") {
    fileUrl = storage.getFilePreview(
      config.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );
  } else {
    throw new Error("Invalid file type");
  }

  if (!fileUrl) {
    throw new Error("Failed to upload file");
  }
  return fileUrl;
}

export async function getUserBookmark(userId: string) {
  const post = await database.listDocuments(
    config.databaseId, config.bookmarkId, [Query.equal("userId", userId), Query.orderDesc("$createdAt")]
  )
  return post.documents.map(p => p.videoId);
}

export async function saveBookmark(userId: string, videoId: string) {
  const newBookmark = await database.createDocument(
    config.databaseId,
    config.bookmarkId,
    ID.unique(),
    {
      userId,
      videoId
    }
  )
  return newBookmark;
}
