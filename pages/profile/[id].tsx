import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { client, GET_PROFILES, GET_PUBLICATIONS } from "../../api";
import Image from "next/image";
import { ethers } from "ethers";

import ABI from "../../abi.json";
const address = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

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

  async function connect() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log({ accounts });
  }

  async function followUser() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(address, ABI, signer);

    try {
      const tx = await contract.foloow([id], [0x0]);
      await tx.wait();
      console.log("followed user successfully");
    } catch (error) {
      console.log(error);
    }
  }
  if (!profile) return null;
  return (
    <div>
      <button onClick={connect}>Sign In</button>
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
        <button onClick={followUser}>Follow</button>
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
