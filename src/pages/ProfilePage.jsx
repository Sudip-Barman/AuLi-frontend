import { useEffect, useState } from "react";
import "./ProfilePage.css";
import API_URL from "../api";

function ProfilePage() {

  const [user, setUser] = useState(null);
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {

    const fetchProfile = async () => {

      const token = localStorage.getItem("token");

      try {

        const res = await fetch(
          `${API_URL}/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setUser(data);

      } catch (err) {

        console.error("Profile fetch failed");

      }

    };

    const fetchUsage = async () => {

      const token = localStorage.getItem("token");

      try {

        const res = await fetch(
          `${API_URL}/usage-tracking`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        setUsageData(data);

      } catch (err) {

        console.error("Usage tracking failed");

      }

    };

    fetchProfile();
    fetchUsage();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  if (!user) {

    return (
      <div className="profile-loading">
        Loading...
      </div>
    );

  }

  return (

    <div className="profile-container">

      <div className="profile-card">

        {/* USER INFO */}

        <div className="profile-top">

          <div className="profile-avatar">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-details">

            <h1 className="profile-username">
              {user.username}
            </h1>

            <p className="profile-email">
              {user.email}
            </p>

          </div>

        </div>

        {/* TRACKING GRAPH */}

        <div className="tracking-section">

          <div className="tracking-header">

            <span>
              Daily Usage
            </span>

          </div>

          <div className="tracking-graph">

            {usageData.map((item, index) => (

              <div
                key={index}
                className="tracking-column"
              >

                <div
                  className="tracking-bar"
                  style={{
                    height: `${item.minutes}%`,
                  }}
                ></div>

                <span className="tracking-day">
                  {item.day}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* LOGOUT */}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default ProfilePage;