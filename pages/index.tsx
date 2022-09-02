import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { client, RECOMMENDED_PROFILES } from "../api";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  useEffect(() => {
    fetchProfiles();
  }, []);
  useEffect(() => {
    console.log(profiles);
  }, [profiles]);

  async function fetchProfiles() {
    try {
      const response = await client.query(RECOMMENDED_PROFILES).toPromise();
      setProfiles(response.data.recommendedProfiles);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div>
      {profiles.map((profile, index) => (
        <Link href={`profile/${profile.id}`}>
          <a>
            <div>
              {profile.picture ? (
                <Image
                  src={profile.picture.original?.url}
                  width="60px"
                  height="60px"
                />
              ) : (
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "black",
                  }}
                />
              )}
              <h3>{profile.handle}</h3>
              <h4>{profile.bio}</h4>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
