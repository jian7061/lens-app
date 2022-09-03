import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { client, GET_PROFILES, GET_PUBLICATIONS } from "../../api";
import Image from "next/image";


export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState<any>();
  const [publications, setPublications] = useState<any[]>([]);
  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  //   useEffect(() => {
  //     console.log(profile);
  //   }, [profile]);

  //   useEffect(() => {
  //     console.log(publications);
  //   }, [publications]);

  async function fetchProfile() {
    try {
      const response = await client.query(GET_PROFILES, { id }).toPromise();
      setProfile(response.data.profiles.items[0]);

      const publicationData = await client
        .query(GET_PUBLICATIONS, { id })
        .toPromise();

      setPublications(publicationData.data.publications.items);
    } catch (error) {
      console.log(error);
    }
  }

  if (!profile) return null;
  return (
    <div>
      {profile?.picture ? (
        <Image
          src={profile.picture.original.url}
          width="200px"
          height="200px"
        />
      ) : (
        <div
          style={{ width: "200px", height: "200px", backgroundColor: "black" }}
        />
      )}
      <div>
        <h4>{profile?.handle}</h4>
        <p>{profile?.bio}</p>
        <p>Followers: {profile?.stats.totalFollowers}</p>
        <p>Followers: {profile?.stats.totalFollowing}</p>
      </div>
      <div>
        {publications.map((publication, index) => (
          <div style={{ padding: "20px", borderTop: "1px solid #ededed" }}>
            {publication.metadata.content}
          </div>
        ))}
      </div>
    </div>
  );
}
