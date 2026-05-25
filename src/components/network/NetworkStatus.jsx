import { useEffect, useState } from "react";
import "./NetworkStatus.css";

function NetworkStatus() {

  const [networkStatus, setNetworkStatus] =
    useState("");

  useEffect(() => {

    const handleOffline = () => {

      setNetworkStatus("offline");

    };

    const handleOnline = () => {

      setNetworkStatus("online");

      setTimeout(() => {

        setNetworkStatus("");

      }, 3000);

    };

    window.addEventListener(
      "offline",
      handleOffline
    );

    window.addEventListener(
      "online",
      handleOnline
    );

    return () => {

      window.removeEventListener(
        "offline",
        handleOffline
      );

      window.removeEventListener(
        "online",
        handleOnline
      );

    };

  }, []);

  return (

    <>

      {networkStatus === "offline" && (

        <div className="network-popup offline">

          <div className="network-icon">
            🌐
          </div>

          <div>

            <h3>
              No Internet Connection
            </h3>

            <p>
              AuLi cannot reach the server.
            </p>

          </div>

        </div>

      )}

      {networkStatus === "online" && (

        <div className="network-popup online">

          <div className="network-icon">
            ✅
          </div>

          <div>

            <h3>
              Connection Restored
            </h3>

            <p>
              You are back online.
            </p>

          </div>

        </div>

      )}

    </>

  );

}

export default NetworkStatus;