import { ChevronRightIcon, ClockIcon } from "@heroicons/react/24/outline";
import "./RecentActivityCard.css";

export default function RecentActivityCard({ recentActivities }) {
  return (
    <a href="/recent-activity" className="recent-activity-link">
      <div className="recent-activity-card">
        <div className="activity-header">
          <h3>Recent Activity</h3>
          <ChevronRightIcon className="chevron-icon" />
        </div>
        <div className="activity-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className="activity-info">
                <h2>{activity.action}:</h2>
                <h3 className="log-name">{activity.logName}</h3>
              </div>
              <div className="activity-time">
                <h3>{activity.time}</h3>
              </div>
              <ClockIcon className="time-icon" />
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}
