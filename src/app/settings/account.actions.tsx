// app/actions/account.ts
"use server";

import { getUserAction, isValidSession } from "@/actions/lucia.actions";
import { uploadBlob } from "@/actions/blob.actions";
import { updateUserAvatar } from "@/actions/user.actions";
import { getUserById, updateUserById } from "@/data-access/user";

// todo: do we really need this?
export async function getUserData() {
  const { user: sessionUser } = await getUserAction();
  if (sessionUser) {
    const user = await getUserById(sessionUser.id);
    return user;
  }
  return null;
}

export async function updateUserProfile(formData: FormData) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const userId = formData.get("id") as string;
  const name = formData.get("name") as string;
  const theme = formData.get("theme") as string;

  try {
    await updateUserById(userId, { name, theme });
    return { success: true, message: "Successfully updated user" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred while updating user" };
  }
}

export async function uploadAvatar(formData: FormData) {
  const isSessionValid = await isValidSession();
  if (!isSessionValid) {
    throw new Error("Your session has expired. Please log in again.");
  }

  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("Please select an image to upload.");
  }

  const blob = await uploadBlob(formData);

  if (blob) {
    await updateUserAvatar(blob.url);
    return { success: true, avatarUrl: blob.url };
  } else {
    throw new Error("Failed to upload avatar");
  }
}

// OLD todo: read thru again and delete

// const handleAvatarUpload = async (
//   avatarFile: File,
//   setIsUploadingAvatar: (isUploading: boolean) => void,
// ) => {
//   const isSessionValid = await isValidSession();
//   if (!isSessionValid) {
//     toast.error("Your session has expired. Please log in again.");
//     router.push("/login");
//     return;
//   }
//   if (!avatarFile) {
//     toast.error("Please select an image to upload.");
//     return;
//   }
//   const formData = new FormData();
//   formData.append("file", avatarFile);
//   formData.append("path", "avatars/");
//   setIsUploadingAvatar(true);

//   // Announce to screen readers that upload has started
//   const statusElement = document.getElementById("upload-status");
//   if (statusElement) {
//     statusElement.textContent = "Avatar upload started";
//     statusElement.setAttribute("aria-live", "polite");
//   }

//   const blob = await uploadBlob(formData);

//   if (blob) {
//     await updateUserAvatar(blob.url);
//     setIsUploadingAvatar(false);
//     router.refresh();
//     setIsModalOpen(false);
//     await updateUser({ where: { id: user?.id }, data: { avatar: blob.url } });
//     toast.success("Avatar uploaded successfully");
//   } else {
//     setIsUploadingAvatar(false);
//     toast.error("Failed to upload avatar");
//   }
// };
