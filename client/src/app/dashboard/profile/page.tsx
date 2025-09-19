import { ProfileForm } from "@/components/profile/profile-form";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Manage Your Profile</h2>
            <ProfileForm />
        </div>
    );
}