import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { client, recommendedProfiles } from "../api";

const Home: NextPage = () => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    fetchProfiles();
  }, []);
  useEffect(() => {
    console.log(profiles);
  }, [profiles]);

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendedProfiles).toPromise();
      setProfiles(response.data.recommendedProfiles);
    } catch (err) {
      console.log({ err });
    }
  }

  return <div></div>;
};

export default Home;
