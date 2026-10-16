import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { BoardMember } from "@/lib/supabase/types";

export type { BoardMember };

export const DEFAULT_BOARD_MEMBERS: BoardMember[] = [
  {
    id: 1,
    role: "Patron",
    role_description: "Ordförande",
    name: "Broder Patron",
    email: "patron@skvadern.net",
    image: null,
    sort_order: 1,
  },
  {
    id: 2,
    role: "Vice Patron",
    role_description: "Vice ordförande",
    name: "Broder Vice Patron",
    email: "vicepatron@skvadern.net",
    image: null,
    sort_order: 2,
  },
  {
    id: 3,
    role: "Bokhållare",
    role_description: "Skattmästare",
    name: "Broder Bokhållare",
    email: "kassor@skvadern.net",
    image: null,
    sort_order: 3,
  },
  {
    id: 4,
    role: "Stämplare",
    role_description: "Sekreterare",
    name: "Broder Stämplare",
    email: "sekreterare@skvadern.net",
    image: null,
    sort_order: 4,
  },
  {
    id: 5,
    role: "Nitare",
    role_description: "Klubbmästare & PR",
    name: "Broder Nitare",
    email: "kontakt@skvadern.net",
    image: null,
    sort_order: 5,
  },
  {
    id: 6,
    role: "Barkborre",
    role_description: "Kök- & Festkoordinator",
    name: "Broder Barkborre",
    email: null,
    image: null,
    sort_order: 6,
  },
  {
    id: 7,
    role: "Pinnpojke",
    role_description: "Måltidsmarskalk",
    name: "Broder Pinnpojke",
    email: null,
    image: null,
    sort_order: 7,
  },
  {
    id: 8,
    role: "Samlare",
    role_description: "Arkivarie & Förrådsmästare",
    name: "Broder Samlare",
    email: null,
    image: null,
    sort_order: 8,
  },
];

export const getBoardMembers = unstable_cache(
  async (): Promise<BoardMember[]> => {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("board_members")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        return DEFAULT_BOARD_MEMBERS;
      }
      return data;
    } catch {
      return DEFAULT_BOARD_MEMBERS;
    }
  },
  ["board-members"],
  { tags: ["board"] }
);
