import { UserCircleIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import "./ProfileBar.css";

const ProfileBar = () => {
  const { session } = useAuth();
  const { first_name = "User", stage = "Title" } =
    session?.user?.user_metadata || {};

  return (
    <div className="profile-bar">
      <div className="profile-bar__info">
        <UserCircleIcon className="profile-bar__avatar" />
        <div className="profile-bar__text">
          <span className="profile-bar__name">{first_name}</span>
          <span className="profile-bar__title">{stage}</span>
        </div>
      </div>
      <ChevronUpIcon className="profile-bar__settings" />
    </div>
  );
};

export default ProfileBar;
