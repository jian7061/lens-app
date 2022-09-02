import { createClient } from "urql";

const APIURL = "https://api.lens.dev";

export const client = createClient({
  url: APIURL,
});

export const recommendedProfiles = `
  query RecommendedProfiles {
    recommendedProfiles {
        id
        name
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        handle
        stats {
          totalFollowers
        }
    }
    }
`;
