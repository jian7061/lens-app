import { createClient } from "urql";

const APIURL = "https://api.lens.dev";

export const client = createClient({
  url: APIURL,
});

// export const recommendedProfiles = `
//   query RecommendedProfiles {
//     recommendedProfiles {
//         id
//         name
//         picture {
//           ... on MediaSet {
//             original {
//               url
//             }
//           }
//         }
//         handle
//         stats {
//           totalFollowers
//         }
//     }
//     }
// `;

export const RECOMMENDED_PROFILES = `
  query {
    recommendedProfiles {
        id
        name
        bio
        attributes {
            displayType
            traitType
            key
            value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              width
              height
              mimeType
            }
            small {
              url
              width
              height
              mimeType
            }
            medium {
              url
              width
              height
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              width
              height
              mimeType
            }
            small {
              height
              width
              url
              mimeType
            }
            medium {
              url
              width
              height
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
      }
    }
  }
`;
