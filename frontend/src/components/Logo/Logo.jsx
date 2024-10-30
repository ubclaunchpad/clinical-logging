import "./Logo.css";

export default function Logo({ variant }) {
  return (
    <div
      className={
        variant === "sidebar" ? "sidebar-logo-container" : "logo-text-container"
      }
    >
      {variant === "sidebar" ? (
        <>
          <span className="sidebar-logo-text-bold">
            FlowLeaflets <br />
          </span>
          <span className="sidebar-logo-text-small">Clinical Logbooks</span>
        </>
      ) : (
        <p className="logo-text-bold">
          FlowLeaflets <br />
          <span className="logo-text-small">Clinical Logbooks</span>
        </p>
      )}
    </div>
  );
}
