import ShopBooksCard from "./ShopBooksCard";
import RecentActivityCard from "./RecentActivityCard";
import "./BottomSection.css";

export default function BottomSection({ recentActivities }) {
  return (
    <div className="bottom-section">
      <ShopBooksCard />
      <RecentActivityCard recentActivities={recentActivities} />
    </div>
  );
}
