import { getPublicProfile } from "@/actions/public/profile";
import { notFound } from "next/navigation";
import { ProfileContent } from "@/components/profile/profile-content";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;
  const result = await getPublicProfile(userId);

  if (!result.success || !result.data) {
    notFound();
  }

  return <ProfileContent user={result.data} />;
}
