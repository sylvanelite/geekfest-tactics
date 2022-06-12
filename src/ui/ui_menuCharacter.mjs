
import { Renderer } from "../renderer/renderer.mjs";
import { Menu,MENU_STATE } from "../renderer/menu.mjs";


const male_data={
    "file": [
      {
        "id": "0",
        "name": "male_portraits/back_arm_0.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "1",
        "name": "male_portraits/base_hair_0.png",
        "width": "667",
        "height": "655"
      },
      {
        "id": "2",
        "name": "male_portraits/eyebrows_0.png",
        "width": "214",
        "height": "158"
      },
      {
        "id": "3",
        "name": "male_portraits/eyes_0.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "4",
        "name": "male_portraits/front_arm_0.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "5",
        "name": "male_portraits/front_ear_0.png",
        "width": "194",
        "height": "212"
      },
      {
        "id": "6",
        "name": "male_portraits/hair_front_0.png",
        "width": "818",
        "height": "1077"
      },
      {
        "id": "7",
        "name": "male_portraits/head_0.png",
        "width": "309",
        "height": "384"
      },
      {
        "id": "8",
        "name": "male_portraits/mouth_0.png",
        "width": "150",
        "height": "127"
      },
      {
        "id": "9",
        "name": "male_portraits/nose_0.png",
        "width": "168",
        "height": "143"
      },
      {
        "id": "10",
        "name": "male_portraits/torso_0.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "11",
        "name": "male_portraits/back_arm_1.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "12",
        "name": "male_portraits/cape_0_top.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "13",
        "name": "male_portraits/cape_back_0.png",
        "width": "796",
        "height": "522"
      },
      {
        "id": "14",
        "name": "male_portraits/front_arm_1.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "15",
        "name": "male_portraits/torso_1.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "16",
        "name": "male_portraits/cape_0_top_back.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "17",
        "name": "male_portraits/facial_hair_0.png",
        "width": "505",
        "height": "691"
      },
      {
        "id": "18",
        "name": "male_portraits/NECKLACE_0.png",
        "width": "592",
        "height": "623"
      },
      {
        "id": "19",
        "name": "male_portraits/wing_back_0.png",
        "width": "668",
        "height": "1020"
      },
      {
        "id": "20",
        "name": "male_portraits/wing_front_0.png",
        "width": "679",
        "height": "1051"
      },
      {
        "id": "21",
        "name": "male_portraits/headgear_0.png",
        "width": "1053",
        "height": "1410"
      },
      {
        "id": "22",
        "name": "male_portraits/nose_1.png",
        "width": "168",
        "height": "143"
      },
      {
        "id": "23",
        "name": "male_portraits/torso_5.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "24",
        "name": "male_portraits/front_arm_5.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "25",
        "name": "male_portraits/back_arm_5.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "26",
        "name": "male_portraits/facial_hair_2.png",
        "width": "505",
        "height": "691"
      },
      {
        "id": "27",
        "name": "male_portraits/base_hair_4.png",
        "width": "667",
        "height": "655"
      },
      {
        "id": "28",
        "name": "male_portraits/eyebrows_2.png",
        "width": "214",
        "height": "158"
      },
      {
        "id": "29",
        "name": "male_portraits/eyes_2.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "30",
        "name": "male_portraits/hair_back_0.png",
        "width": "656",
        "height": "1236"
      },
      {
        "id": "31",
        "name": "male_portraits/cape_2_top.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "32",
        "name": "male_portraits/head_shading_0.png",
        "width": "309",
        "height": "384"
      },
      {
        "id": "33",
        "name": "male_portraits/base_hair_2.png",
        "width": "667",
        "height": "655"
      },
      {
        "id": "34",
        "name": "male_portraits/eyebrows_1.png",
        "width": "214",
        "height": "158"
      },
      {
        "id": "35",
        "name": "male_portraits/head_shading_1.png",
        "width": "309",
        "height": "384"
      },
      {
        "id": "36",
        "name": "male_portraits/headgear_1.png",
        "width": "1053",
        "height": "1410"
      },
      {
        "id": "37",
        "name": "male_portraits/hair_back_4.png",
        "width": "656",
        "height": "1236"
      },
      {
        "id": "38",
        "name": "male_portraits/torso_2.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "39",
        "name": "male_portraits/front_arm_2.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "40",
        "name": "male_portraits/back_arm_2.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "41",
        "name": "male_portraits/torso_2_overlay.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "42",
        "name": "male_portraits/torso_3.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "43",
        "name": "male_portraits/back_arm_3.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "44",
        "name": "male_portraits/front_arm_3.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "45",
        "name": "male_portraits/torso_4.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "46",
        "name": "male_portraits/back_arm_4.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "47",
        "name": "male_portraits/front_arm_4.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "48",
        "name": "male_portraits/base_hair_3.png",
        "width": "667",
        "height": "655"
      },
      {
        "id": "49",
        "name": "male_portraits/headgear_2.png",
        "width": "1053",
        "height": "1410"
      },
      {
        "id": "50",
        "name": "male_portraits/torso_6.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "51",
        "name": "male_portraits/back_arm_6.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "52",
        "name": "male_portraits/front_arm_6.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "53",
        "name": "male_portraits/torso_7.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "54",
        "name": "male_portraits/back_arm_7.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "55",
        "name": "male_portraits/front_arm_7.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "56",
        "name": "male_portraits/headgear_7.png",
        "width": "1053",
        "height": "1410"
      },
      {
        "id": "57",
        "name": "male_portraits/back_arm_8.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "58",
        "name": "male_portraits/front_arm_8.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "59",
        "name": "male_portraits/torso_8.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "60",
        "name": "male_portraits/headgear_8.png",
        "width": "1053",
        "height": "1410"
      },
      {
        "id": "61",
        "name": "male_portraits/base_hair_5.png",
        "width": "667",
        "height": "655"
      },
      {
        "id": "62",
        "name": "male_portraits/base_hair_6.png",
        "width": "667",
        "height": "655"
      },
      {
        "id": "63",
        "name": "male_portraits/nose_2.png",
        "width": "168",
        "height": "143"
      },
      {
        "id": "64",
        "name": "male_portraits/nose_3.png",
        "width": "168",
        "height": "143"
      },
      {
        "id": "65",
        "name": "male_portraits/nose_4.png",
        "width": "168",
        "height": "143"
      },
      {
        "id": "66",
        "name": "male_portraits/nose_5.png",
        "width": "168",
        "height": "143"
      },
      {
        "id": "67",
        "name": "male_portraits/back_arm_9.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "68",
        "name": "male_portraits/front_arm_9.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "69",
        "name": "male_portraits/torso_9.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "70",
        "name": "male_portraits/headgear_9.png",
        "width": "1053",
        "height": "1410"
      },
      {
        "id": "71",
        "name": "male_portraits/back_arm_1x.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "72",
        "name": "male_portraits/front_arm_1x.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "73",
        "name": "male_portraits/torso_2x.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "74",
        "name": "male_portraits/front_arm_2x.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "75",
        "name": "male_portraits/back_arm_2x.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "76",
        "name": "male_portraits/torso_3x.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "77",
        "name": "male_portraits/back_arm_3x.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "78",
        "name": "male_portraits/front_arm_3x.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "79",
        "name": "male_portraits/torso_4x.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "80",
        "name": "male_portraits/back_arm_4x.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "81",
        "name": "male_portraits/front_arm_4x.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "82",
        "name": "male_portraits/torso_5x.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "83",
        "name": "male_portraits/back_arm_5x.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "84",
        "name": "male_portraits/front_arm_5x.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "85",
        "name": "male_portraits/torso_9x.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "86",
        "name": "male_portraits/front_arm_9x.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "87",
        "name": "male_portraits/back_arm_9x.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "88",
        "name": "male_portraits/torso_10.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "89",
        "name": "male_portraits/front_arm_10.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "90",
        "name": "male_portraits/back_arm_10.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "91",
        "name": "male_portraits/headgear_10.png",
        "width": "1053",
        "height": "1410"
      },
      {
        "id": "92",
        "name": "male_portraits/torso_11.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "93",
        "name": "male_portraits/back_arm_11.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "94",
        "name": "male_portraits/front_arm_11.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "95",
        "name": "male_portraits/headgear_11.png",
        "width": "1053",
        "height": "1410"
      },
      {
        "id": "96",
        "name": "male_portraits/back_arm_7x.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "97",
        "name": "male_portraits/front_arm_7x.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "98",
        "name": "male_portraits/back_arm_8x.png",
        "width": "333",
        "height": "533"
      },
      {
        "id": "99",
        "name": "male_portraits/front_arm_8x.png",
        "width": "420",
        "height": "638"
      },
      {
        "id": "100",
        "name": "male_portraits/cape_back_patch.png",
        "width": "558",
        "height": "233"
      },
      {
        "id": "101",
        "name": "male_portraits/elf_ear_0.png",
        "width": "194",
        "height": "212"
      },
      {
        "id": "102",
        "name": "male_portraits/torso_2x_overlay.png",
        "width": "666",
        "height": "761"
      },
      {
        "id": "103",
        "name": "male_portraits/wing_back_1.png",
        "width": "668",
        "height": "1020"
      },
      {
        "id": "104",
        "name": "male_portraits/wing_front_1.png",
        "width": "679",
        "height": "1051"
      },
      {
        "id": "105",
        "name": "male_portraits/base_hair_7.png",
        "width": "667",
        "height": "655"
      },
      {
        "id": "106",
        "name": "male_portraits/hair_back_7.png",
        "width": "656",
        "height": "1236"
      },
      {
        "id": "107",
        "name": "male_portraits/necklace_2.png",
        "width": "592",
        "height": "623"
      },
      {
        "id": "108",
        "name": "male_portraits/head_scar_0.png",
        "width": "342",
        "height": "391"
      },
      {
        "id": "109",
        "name": "male_portraits/cape_3_top.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "110",
        "name": "male_portraits/cape_back_3.png",
        "width": "796",
        "height": "522"
      },
      {
        "id": "111",
        "name": "male_portraits/cape_3_top_back.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "112",
        "name": "male_portraits/mouth_1.png",
        "width": "150",
        "height": "127"
      },
      {
        "id": "113",
        "name": "male_portraits/mouth_2.png",
        "width": "150",
        "height": "127"
      },
      {
        "id": "114",
        "name": "male_portraits/eyes_0x.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "115",
        "name": "male_portraits/eyes_2x.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "116",
        "name": "male_portraits/eyes_0 _blink_a.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "117",
        "name": "male_portraits/eyes_0 _blink_b.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "118",
        "name": "male_portraits/eyes_0x_blink_b.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "119",
        "name": "male_portraits/eyes_2_blink_a.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "120",
        "name": "male_portraits/eyes_2_blink_b.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "121",
        "name": "male_portraits/eyes_2x_blink_b.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "122",
        "name": "male_portraits/eyesZ_0.png",
        "width": "176",
        "height": "129"
      },
      {
        "id": "123",
        "name": "male_portraits/eyesZ_0 _blink_b.png",
        "width": "176",
        "height": "129"
      }
    ]
  };

const female_data={
    "file": [
      {
        "id": "0",
        "name": "female_portraits/torso_0.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "1",
        "name": "female_portraits/nose_0.png",
        "width": "124",
        "height": "148"
      },
      {
        "id": "2",
        "name": "female_portraits/mouth_0.png",
        "width": "145",
        "height": "109"
      },
      {
        "id": "3",
        "name": "female_portraits/back_arm_0.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "4",
        "name": "female_portraits/front_arm_0.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "5",
        "name": "female_portraits/head_0.png",
        "width": "430",
        "height": "475"
      },
      {
        "id": "6",
        "name": "female_portraits/eyes_0.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "7",
        "name": "female_portraits/base_hair_0.png",
        "width": "729",
        "height": "1005"
      },
      {
        "id": "8",
        "name": "female_portraits/backhair_0.png",
        "width": "1040",
        "height": "1354"
      },
      {
        "id": "9",
        "name": "female_portraits/eyebrows_0.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "10",
        "name": "female_portraits/front_hair_0.png",
        "width": "709",
        "height": "1172"
      },
      {
        "id": "11",
        "name": "female_portraits/torso_1.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "12",
        "name": "female_portraits/back_arm_1.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "13",
        "name": "female_portraits/front_arm_1.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "14",
        "name": "female_portraits/torso_2.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "15",
        "name": "female_portraits/front_ear_0.png",
        "width": "287",
        "height": "382"
      },
      {
        "id": "16",
        "name": "female_portraits/front_arm_2.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "17",
        "name": "female_portraits/back_arm_2.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "18",
        "name": "female_portraits/torso_3.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "19",
        "name": "female_portraits/front_arm_3.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "20",
        "name": "female_portraits/back_arm_3.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "21",
        "name": "female_portraits/back_headgear_1.png",
        "width": "600",
        "height": "841"
      },
      {
        "id": "22",
        "name": "female_portraits/headgear_0.png",
        "width": "649",
        "height": "673"
      },
      {
        "id": "23",
        "name": "female_portraits/base_hair_2.png",
        "width": "729",
        "height": "1005"
      },
      {
        "id": "24",
        "name": "female_portraits/torso_4.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "25",
        "name": "female_portraits/back_arm_4.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "26",
        "name": "female_portraits/front_arm_4.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "27",
        "name": "female_portraits/torso_6.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "28",
        "name": "female_portraits/back_arm_6.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "29",
        "name": "female_portraits/front_arm_6.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "30",
        "name": "female_portraits/torso_5.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "31",
        "name": "female_portraits/back_arm_5.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "32",
        "name": "female_portraits/front_arm_5.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "33",
        "name": "female_portraits/torso_7.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "34",
        "name": "female_portraits/back_arm_7.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "35",
        "name": "female_portraits/front_arm_7.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "36",
        "name": "female_portraits/headgear_7.png",
        "width": "649",
        "height": "673"
      },
      {
        "id": "37",
        "name": "female_portraits/torso_8.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "38",
        "name": "female_portraits/back_arm_8.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "39",
        "name": "female_portraits/front_arm_8.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "40",
        "name": "female_portraits/headgear_8.png",
        "width": "649",
        "height": "673"
      },
      {
        "id": "41",
        "name": "female_portraits/base_hair_3.png",
        "width": "729",
        "height": "1005"
      },
      {
        "id": "42",
        "name": "female_portraits/torso_9.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "43",
        "name": "female_portraits/back_arm_9.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "44",
        "name": "female_portraits/front_arm_9.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "45",
        "name": "female_portraits/headgear_9.png",
        "width": "649",
        "height": "673"
      },
      {
        "id": "46",
        "name": "female_portraits/torso_10.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "47",
        "name": "female_portraits/back_arm_10.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "48",
        "name": "female_portraits/front_arm_10.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "49",
        "name": "female_portraits/base_hair_4.png",
        "width": "729",
        "height": "1005"
      },
      {
        "id": "50",
        "name": "female_portraits/torso_11.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "51",
        "name": "female_portraits/back_arm_11.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "52",
        "name": "female_portraits/front_arm_11.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "53",
        "name": "female_portraits/headgear_11.png",
        "width": "649",
        "height": "673"
      },
      {
        "id": "54",
        "name": "female_portraits/torso_12.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "55",
        "name": "female_portraits/back_arm_12.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "56",
        "name": "female_portraits/front_arm_12.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "57",
        "name": "female_portraits/headgear_12.png",
        "width": "649",
        "height": "673"
      },
      {
        "id": "58",
        "name": "female_portraits/torso_2x.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "59",
        "name": "female_portraits/back_arm_2x.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "60",
        "name": "female_portraits/front_arm_2x.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "61",
        "name": "female_portraits/torso_7x.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "62",
        "name": "female_portraits/back_arm_7x.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "63",
        "name": "female_portraits/front_arm_7x.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "64",
        "name": "female_portraits/torso_10x.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "65",
        "name": "female_portraits/back_arm_10x.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "66",
        "name": "female_portraits/front_arm_10x.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "67",
        "name": "female_portraits/torso_8x.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "68",
        "name": "female_portraits/back_arm_8x.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "69",
        "name": "female_portraits/front_arm_8x.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "70",
        "name": "female_portraits/torso_4x.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "71",
        "name": "female_portraits/back_arm_4x.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "72",
        "name": "female_portraits/front_arm_4x.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "73",
        "name": "female_portraits/torso_11x.png",
        "width": "703",
        "height": "698"
      },
      {
        "id": "74",
        "name": "female_portraits/back_arm_11x.png",
        "width": "393",
        "height": "697"
      },
      {
        "id": "75",
        "name": "female_portraits/front_arm_11x.png",
        "width": "509",
        "height": "686"
      },
      {
        "id": "76",
        "name": "female_portraits/cape_back_0.png",
        "width": "796",
        "height": "522"
      },
      {
        "id": "77",
        "name": "female_portraits/cape_0_top_back.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "78",
        "name": "female_portraits/cape_0_top.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "79",
        "name": "female_portraits/cape_back_patch.png",
        "width": "558",
        "height": "233"
      },
      {
        "id": "80",
        "name": "female_portraits/cape_2_top.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "81",
        "name": "female_portraits/front_ear_1.png",
        "width": "287",
        "height": "382"
      },
      {
        "id": "82",
        "name": "female_portraits/backhair_5.png",
        "width": "1040",
        "height": "1354"
      },
      {
        "id": "83",
        "name": "female_portraits/base_hair_5.png",
        "width": "729",
        "height": "1005"
      },
      {
        "id": "84",
        "name": "female_portraits/front_hair_5.png",
        "width": "709",
        "height": "1172"
      },
      {
        "id": "85",
        "name": "female_portraits/backhair_1.png",
        "width": "1040",
        "height": "1354"
      },
      {
        "id": "86",
        "name": "female_portraits/front_hair_1.png",
        "width": "709",
        "height": "1172"
      },
      {
        "id": "87",
        "name": "female_portraits/base_hair_6.png",
        "width": "729",
        "height": "1005"
      },
      {
        "id": "88",
        "name": "female_portraits/backhair_6.png",
        "width": "1040",
        "height": "1354"
      },
      {
        "id": "89",
        "name": "female_portraits/eyes_1.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "90",
        "name": "female_portraits/eyebrows_1.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "91",
        "name": "female_portraits/eyebrows_2.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "92",
        "name": "female_portraits/nose_1.png",
        "width": "124",
        "height": "148"
      },
      {
        "id": "93",
        "name": "female_portraits/nose_2.png",
        "width": "124",
        "height": "148"
      },
      {
        "id": "94",
        "name": "female_portraits/nose_3.png",
        "width": "124",
        "height": "148"
      },
      {
        "id": "95",
        "name": "female_portraits/nose_4.png",
        "width": "124",
        "height": "148"
      },
      {
        "id": "96",
        "name": "female_portraits/mouth_1.png",
        "width": "145",
        "height": "109"
      },
      {
        "id": "97",
        "name": "female_portraits/earrings_0.png",
        "width": "450",
        "height": "449"
      },
      {
        "id": "98",
        "name": "female_portraits/earrings_1.png",
        "width": "450",
        "height": "449"
      },
      {
        "id": "99",
        "name": "female_portraits/necklace_0.png",
        "width": "592",
        "height": "623"
      },
      {
        "id": "100",
        "name": "female_portraits/necklace_1.png",
        "width": "592",
        "height": "623"
      },
      {
        "id": "101",
        "name": "female_portraits/head_scar_0.png",
        "width": "342",
        "height": "391"
      },
      {
        "id": "102",
        "name": "female_portraits/cape_back_3.png",
        "width": "796",
        "height": "522"
      },
      {
        "id": "103",
        "name": "female_portraits/cape_3_top.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "104",
        "name": "female_portraits/cape_3_top_back.png",
        "width": "846",
        "height": "546"
      },
      {
        "id": "105",
        "name": "female_portraits/headgear_1.png",
        "width": "649",
        "height": "673"
      },
      {
        "id": "106",
        "name": "female_portraits/base_hair_for_helmets.png",
        "width": "729",
        "height": "1005"
      },
      {
        "id": "107",
        "name": "female_portraits/eyes_0_blink_a.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "108",
        "name": "female_portraits/eyes_0_blink_b.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "109",
        "name": "female_portraits/eyes_1_blink_b.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "110",
        "name": "female_portraits/eyesZ_0.png",
        "width": "258",
        "height": "249"
      },
      {
        "id": "111",
        "name": "female_portraits/eyesZ_0_blink_b.png",
        "width": "258",
        "height": "249"
      }
    ]
};

const portraits = {
	torso:{
		male:[
		"torso_0.png",
		"torso_1.png",
		"torso_2.png",//TODO; 2 overlay
		"torso_2x.png",//TODO; 2x overlay
		"torso_3.png",
		"torso_3x.png",
		"torso_4.png",
		"torso_4x.png",
		"torso_5.png",
		"torso_5x.png",
		"torso_6.png",
		"torso_7.png",
		"torso_8.png",
		"torso_9.png",
		"torso_9x.png",
		"torso_10.png",
		"torso_11.png",
		],
		female:[
		"torso_0.png",
		"torso_1.png",
		"torso_2.png",
		"torso_2x.png",
		"torso_3.png",
		"torso_4.png",
		"torso_4x.png",
		"torso_5.png",
		"torso_6.png",
		"torso_7.png",
		"torso_7x.png",
		"torso_8.png",
		"torso_8x.png",
		"torso_9.png",
		"torso_10.png",
		"torso_10x.png",
		"torso_11.png",
		"torso_11x.png",
		"torso_12.png",
		],
	},
	nose:{
		male:[
		"nose_0.png",
		"nose_1.png",
		"nose_2.png",
		"nose_3.png",
		"nose_4.png",
		"nose_5.png",
		],
		female:[
		"nose_0.png",
		"nose_1.png",
		"nose_2.png",
		"nose_3.png",
		"nose_4.png",
		],
	},
	mouth:{
		male:["mouth_0.png","mouth_1.png","mouth_2.png"],
		female:["mouth_0.png","mouth_1.png"],
	},
	back_arm:{
		male:[
		"back_arm_0.png",
		"back_arm_1.png",
		"back_arm_1x.png",
		"back_arm_2.png",
		"back_arm_2x.png",
		"back_arm_3.png",
		"back_arm_3x.png",
		"back_arm_4.png",
		"back_arm_4x.png",
		"back_arm_5.png",
		"back_arm_5x.png",
		"back_arm_6.png",
		"back_arm_7.png",
		"back_arm_7x.png",
		"back_arm_8.png",
		"back_arm_8x.png",
		"back_arm_9.png",
		"back_arm_9x.png",
		"back_arm_10.png",
		"back_arm_11.png",
		],
		female:[
		"back_arm_0.png",
		"back_arm_1.png",
		"back_arm_2.png",
		"back_arm_2x.png",
		"back_arm_3.png",
		"back_arm_4.png",
		"back_arm_4x.png",
		"back_arm_5.png",
		"back_arm_6.png",
		"back_arm_7.png",
		"back_arm_7x.png",
		"back_arm_8.png",
		"back_arm_8x.png",
		"back_arm_9.png",
		"back_arm_10.png",
		"back_arm_10x.png",
		"back_arm_11.png",
		"back_arm_11x.png",
		"back_arm_12.png"
		],
	},
	front_arm:{
		male:[
		"front_arm_0.png",
		"front_arm_1.png",
		"front_arm_1x.png",
		"front_arm_2.png",
		"front_arm_2x.png",
		"front_arm_3.png",
		"front_arm_3x.png",
		"front_arm_4.png",
		"front_arm_4x.png",
		"front_arm_5.png",
		"front_arm_5x.png",
		"front_arm_6.png",
		"front_arm_7.png",
		"front_arm_7x.png",
		"front_arm_8.png",
		"front_arm_8x.png",
		"front_arm_9.png",
		"front_arm_9x.png",
		"front_arm_10.png",
		"front_arm_11.png",
		],
		female:[
		"front_arm_0.png",
		"front_arm_1.png",
		"front_arm_2.png",
		"front_arm_2x.png",
		"front_arm_3.png",
		"front_arm_4.png",
		"front_arm_4x.png",
		"front_arm_5.png",
		"front_arm_6.png",
		"front_arm_7.png",
		"front_arm_7x.png",
		"front_arm_8.png",
		"front_arm_8x.png",
		"front_arm_9.png",
		"front_arm_10.png",
		"front_arm_10x.png",//TODO: seems to have different coords?
		"front_arm_11.png",
		"front_arm_11x.png",
		"front_arm_12.png"
		],
	},
	ear:{
		male:["elf_ear_0.png","front_ear_0.png"],
		female:["front_ear_0.png","front_ear_1.png"],
	},
	head:{
		male:[
		"head_0.png",
		],
		female:[
		"head_0.png",
		],
	},
	eyes:{
		male:["eyes_0.png"],
		female:["eyes_0.png"],//todo: blink?
	},
	base_hair:{
		male:[
		"base_hair_0.png",
		"base_hair_2.png",
		"base_hair_3.png",
		"base_hair_4.png",
		"base_hair_5.png",
		"base_hair_6.png",
		"base_hair_7.png",
		"hair_front_0.png",//TODO: this is front, not base?
		],
		female:[
		"base_hair_0.png",
		"base_hair_2.png",
		"base_hair_3.png",
		"base_hair_4.png",
		"base_hair_5.png",
		"base_hair_6.png",
		"base_hair_for_helmets.png",//TODO: helmet?
		],
	},
	back_hair:{
		male:[
		"hair_back_0.png",
		"hair_back_4.png",
		"hair_back_7.png",
		],
		female:[
		//"back_headgear_1.png",//TODO: helmet?
		"backhair_0.png",
		"backhair_1.png",
		"backhair_5.png",
		"backhair_6.png",
		],
	},
	eyebrow:{
		male:[
		"eyebrows_0.png",
		"eyebrows_1.png",
		"eyebrows_2.png",
		],
		female:[
		"eyebrows_0.png",
		"eyebrows_1.png",
		"eyebrows_2.png",
		],
	},
	front_hair:{
		male:[],
		female:[
		"front_hair_0.png",
		"front_hair_1.png",
		"front_hair_5.png",
		],
	},
	headgear:{
		male:[
		"headgear_0.png",
		"headgear_1.png",
		"headgear_2.png",
		"headgear_7.png",
		"headgear_8.png",
		"headgear_9.png",
		"headgear_10.png",
		"headgear_11.png",
		],
		female:[
		"headgear_0.png",
		"headgear_1.png",
		"headgear_7.png",
		"headgear_8.png",
		"headgear_9.png",
		"headgear_11.png",
		"headgear_12.png",
		]
	}
	
};

//TODO: cape, necklace, wings
	
class ui_menuCharacter{
	static draw(ctx){
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_shuffle,ctx);
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_gender,ctx);
		Renderer.drawSprite(ui_menuCharacter.#sprites.btn_start,ctx);
		ui_menuCharacter.drawCharacter(ui_menuCharacter.#selectedChIdx,ctx);//TODO: ch idx
		
		for(let i=0;i<5;i+=1){
			const spr = ui_menuCharacter.#sprites.btn_character;
			spr.x=i*spr.width;
			spr.y=496;
			if(Renderer.isMouseOver(spr)){
				spr.y-=4;
			}
			Renderer.drawSprite(spr,ctx);
			spr.x = 0;
		}
		for(let i=0;i<8;i+=1){
			const spr = ui_menuCharacter.#sprites.btn_icon;
			//front arm
			spr.y=117;
			spr.x=413+i*33;
			Renderer.drawSprite(spr,ctx);
			//back arm
			spr.y=150;
			Renderer.drawSprite(spr,ctx);
			//head
			spr.y=195;
			Renderer.drawSprite(spr,ctx);
			//torso
			spr.y=240;
			Renderer.drawSprite(spr,ctx);
			//back
			spr.y=285;
			Renderer.drawSprite(spr,ctx);
			//reset
			spr.x = 413;
		}
	}
	static click(e){
		
		if(Renderer.isMouseOver(ui_menuCharacter.#sprites.btn_shuffle)){
			ui_menuCharacter.shuffleCharacter();
		}
		if(Renderer.isMouseOver(ui_menuCharacter.#sprites.btn_gender)){
			ui_menuCharacter.swapGender();
		}
		if(Renderer.isMouseOver(ui_menuCharacter.#sprites.btn_start)){
			ui_menuCharacter.start();
		}
		for(let i=0;i<5;i+=1){
			const spr = ui_menuCharacter.#sprites.btn_character;
			spr.x=i*spr.width;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectCharacter(i);
			}
			spr.x = 0;
		}
		for(let i=0;i<8;i+=1){
			const spr = ui_menuCharacter.#sprites.btn_icon;
			//front arm
			spr.y=117;
			spr.x=413+i*33;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectArmFront(i);
			}
			//back arm
			spr.y=150;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectArmBack(i);
			}
			//head
			spr.y=195;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectHead(i);
			}
			//torso
			spr.y=240;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectTorso(i);
			}
			//back
			spr.y=285;
			if(Renderer.isMouseOver(spr)){
				ui_menuCharacter.selectBack(i);
			}
			//reset
			spr.x = 413;
		}
		
	}
	
	static #selectedChIdx = 0;
	static #ch = [{
		isUnlocked:true,
		gender:'female',
		front_arm:0,
		back_arm:0,
		torso:0,
		back:0,
		weapon:0,
		headgear:0,
		
		base_hair:0,
		back_hair:0,
		front_hair:0,
		ear:0,
		eyebrow:0,
		eyes:0,
		mouth:0,
		nose:0,
		head:0,
		
	},{
		isUnlocked:true,
		gender:'male',
		front_arm:1,
		back_arm:1,
		torso:1,
		back:1,
		weapon:1,
		headgear:1,
		
		base_hair:1,
		back_hair:1,
		front_hair:1,
		ear:1,
		eyebrow:1,
		eyes:1,
		mouth:1,
		nose:1,
		head:1,
		
	},{
		isUnlocked:true,
		gender:'male',
		front_arm:2,
		back_arm:2,
		torso:2,
		back:2,
		weapon:2,
		headgear:2,
		
		base_hair:2,
		back_hair:2,
		front_hair:2,
		ear:2,
		eyebrow:2,
		eyes:2,
		mouth:2,
		nose:2,
		head:2,
		
	},{
		isUnlocked:true,
		gender:'male',
		front_arm:3,
		back_arm:3,
		torso:3,
		back:3,
		weapon:3,
		headgear:3,
		
		base_hair:3,
		back_hair:3,
		front_hair:3,
		ear:3,
		eyebrow:3,
		eyes:3,
		mouth:3,
		nose:3,
		head:3,
		
	},{
		isUnlocked:true,
		gender:'male',
		front_arm:4,
		back_arm:4,
		torso:4,
		back:4,
		weapon:4,
		headgear:4,
		
		base_hair:4,
		back_hair:4,
		front_hair:4,
		ear:4,
		eyebrow:4,
		eyes:4,
		mouth:4,
		nose:4,
		head:4,
		
	},
		
	];
	
	static #sprites = {
		btn_character:Renderer.getSprite(
			'ui/menu_character.png',
			0,496,197,48,0,0
		),
		btn_start:Renderer.getSprite(
			'ui/menu_character.png',
			655,353,275,120,0,47
		),
		btn_shuffle:Renderer.getSprite(
			'ui/menu_character.png',
			0,0,95,66,0,167
		),
		btn_gender:Renderer.getSprite(
			'ui/menu_character.png',
			95,0,130,70,95,167
		),
		btn_icon:Renderer.getSprite(
			'ui/menu_character.png',
			413,117,32,32,243,167
		),
		
	};
	
	static selectCharacter(ch){
		
	}
	static start(){
		Menu.setMenuState(MENU_STATE.MAP);
		//TODO: save characters to localstorage?
	}
	static selectCharacter(ch){
		console.log("switch to ch:",ch);
		//TODO: if unlocked...
		ui_menuCharacter.#selectedChIdx = ch;
	}
	static selectArmFront(item){
		console.log("arm f: ",item);		
	}
	static selectArmBack(item){
		console.log("arm b: ",item);
	}
	static selectHead(item){
		console.log("head: ",item);
	}
	static selectTorso(item){
		console.log("torso: ",item);
	}
	static selectBack(item){
		console.log("back: ",item);
	}
	static selectWeapon(item){
		console.log("weapon: ",item);
	}
	static shuffleCharacter(){
		console.log("shuffle");
		const ch = ui_menuCharacter.#ch[ui_menuCharacter.#selectedChIdx];
		/*front_arm:4,
		back_arm:4,
		torso:4,
		back:4,
		weapon:4,
		headgear:4,
		
		base_hair:4,
		back_hair:4,
		front_hair:4,
		ear:4,
		eyebrow:4,
		eyes:4,
		mouth:4,
		nose:4,
		head:4,
		
		*/
		
		const drawOrder = ['back_arm','back_hair','torso','head','base_hair',
					  'eyes','nose','eyebrow','mouth','ear',
					  'front_hair','headgear','front_arm'];
		for(const draw of drawOrder){
			const sprList = portraits[draw][ch.gender];
			const sprIdx = Math.floor(Math.random()*sprList.length);
			ch[draw]=sprIdx;
		}
	}
	static swapGender(){
		console.log("gender");
		const ch = ui_menuCharacter.#ch[ui_menuCharacter.#selectedChIdx];
		if(ch.gender == 'male'){
			ch.gender = 'female';
		}else{
			ch.gender = 'male';
		}
	}
	
	//selectColour
	
	static drawCharacter(chIdx,ctx){
		
		/*
		female:
                    <object_ref id="0" name="wing_front_0" folder="24" file="0" abs_x="-601" abs_y="943" abs_angle="0" abs_scale_x="0.9" abs_scale_y="0.9" abs_a="1" timeline="18" key="0" z_index="0"/>
                    <object_ref id="1" name="wing_back_0" folder="24" file="1" abs_x="-84" abs_y="920" abs_angle="0" abs_scale_x="0.9" abs_scale_y="0.9" abs_a="1" timeline="19" key="0" z_index="1"/>
                    <object_ref id="2" name="cape_back_patch" folder="22" file="79" abs_x="-343.181818" abs_y="522.727273" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="17" key="0" z_index="2"/>
                    <object_ref id="3" name="cape_back_0" folder="22" file="76" abs_x="-463" abs_y="518" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="14" key="0" z_index="3"/>
                    <object_ref id="5" name="cape_0_top_back" folder="22" file="77" abs_x="-477" abs_y="682" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="15" key="0" z_index="5"/>
                   
				   <object_ref id="6" name="back_headgear_1_000" folder="22" file="21" abs_x="-461" abs_y="927" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="11" key="0" z_index="6"/>
                   <object_ref id="9" name="necklace_0_000" folder="22" file="99" abs_x="-282" abs_y="615.5" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="22" key="0" z_index="9"/>
                    
                    <object_ref id="16" name="head_scar_0" folder="22" file="101" abs_x="-162" abs_y="867.5" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="23" key="0" z_index="16"/>
                    
                    <object_ref id="19" name="earrings_0" folder="22" file="97" abs_x="-238" abs_y="829" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="21" key="0" z_index="19"/>

                    <object_ref id="22" name="cape_0_top" folder="22" file="78" abs_x="-468" abs_y="679" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="16" key="0" z_index="22"/>
                    <object_ref id="23" name="front_arm_10x" folder="22" file="66" abs_x="-477" abs_y="669" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="20" key="0" z_index="23"/>
    
		*/
		/*
		male:
		
                    <object_ref id="0" name="wing_back_0" folder="23" file="19" abs_x="-54" abs_y="1020" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="16" key="0" z_index="0"/>
                    <object_ref id="1" name="wing_front_0" folder="23" file="20" abs_x="-640" abs_y="1031" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="17" key="0" z_index="1"/>
                    <object_ref id="2" name="cape_back_patch" folder="23" file="100" abs_x="-274" abs_y="538" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="23" key="0" z_index="2"/>
                    <object_ref id="4" name="cape_back_0" folder="23" file="13" abs_x="-401.965024" abs_y="520.732936" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="13" key="0" z_index="4"/>
                    <object_ref id="5" name="cape_0_top_back" folder="23" file="16" abs_x="-407" abs_y="696" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="12" key="0" z_index="5"/>
                    
                    <object_ref id="9" name="NECKLACE_0" folder="23" file="18" abs_x="-192" abs_y="621" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="15" key="0" z_index="9"/>
                    <object_ref id="10" name="torso_2_overlay_000" folder="23" file="41" abs_x="-321" abs_y="757" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="22" key="0" z_index="10"/>
                    <object_ref id="11" name="cape_0_top" folder="23" file="12" abs_x="-400.849312" abs_y="691.857728" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="11" key="0" z_index="11"/>
                  
                    <object_ref id="13" name="head_shading_0" folder="23" file="32" abs_x="-60" abs_y="867" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="20" key="0" z_index="13"/>
                    <object_ref id="14" name="head_scar_0" folder="23" file="108" abs_x="-83" abs_y="857.5" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="24" key="0" z_index="14"/>
                    
                    <object_ref id="18" name="facial_hair_0" folder="23" file="17" abs_x="-126" abs_y="717" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="14" key="0" z_index="18"/>
					<object_ref id="24" name="front_arm_2" folder="23" file="39" abs_x="-414.9998" abs_y="637.99978" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="21" key="0" z_index="24"/>
					<object_ref id="22" name="hair_front_0" folder="23" file="6" abs_x="-409.615716" abs_y="1063.305619" abs_angle="0" abs_scale_x="1" abs_scale_y="1" abs_a="1" timeline="10" key="0" z_index="22"/>

		*/                    





		//from abs_x above...
		const offsets = {
			female:{
				'back_hair':{x:-722,y:1227},
				'back_arm':{x:-31,y:641},
				'torso':{x:-353.941834,y:683.037442},
				'head':{x:-192,y:910},//aprox:162,-224 relative to torso
				'front_arm':{x:-478,y:665},
				'mouth':{x:-27.08839,y:591.026974},
				'eyes':{x:-67,y:754},
				'eyebrow':{x:-65,y:754},
				'nose':{x:19.968252,y:658.266716},
				'base_hair':{x:-358,y:1175},
				'ear':{x:-254.000016,y:860.99999},
				'front_hair':{x:-303,y:1044},
				'headgear':{x:-310,y:1023},
			},
			male:{
				'back_hair':{x:-293.948416,y:974.511},
				'back_arm':{x:41.00015,y:532.999776},
				'torso':{x:-320.677944,y:760.809035},
				'head':{x:-59.999917,y:858.999872},//aprox:162,-224 relative to torso
				'front_arm':{x:-414.9998,y:637.99978},
				'mouth':{x:56.00005,y:616.000033},
				'eyes':{x:59.00008,y:722.000036},
				'eyebrow':{x:32.000092,y:761.000024},
				'nose':{x:107.999936,y:695.000054},
				'base_hair':{x:-328.194154,y:1044.862415},
				'ear':{x:-139.00004,y:770.000036},
				'front_hair':{x:-303,y:1044},
				'headgear':{x:-448.962599,y:1406.98906},
			}
		};
		
		const ch = ui_menuCharacter.#ch[chIdx];
		
		const getSprData = (name,gender)=>{
			const source = (gender == 'male'?male_data:female_data);
			const search = (gender == 'male'?"male_portraits":"female_portraits")+"/"+name;
			//TODO: use map instead of linear lookup
			for(const portrait of source.file){
				if(portrait.name == search){
					const width = parseInt(portrait.width,10);
					const height = parseInt(portrait.height,10);
					return {
						name:portrait.name,
						width,height
					};
				}
			}
			
		};
		/*
		back:0,//todo
		weapon:0,//todo
		*/
		const drawOrder = ['back_arm','back_hair','torso','head','base_hair',
					  'eyes','nose','eyebrow','mouth','ear',
					  'front_hair','headgear','front_arm'];
		for(const draw of drawOrder){
			if(draw == 'front_hair' && ch.gender == 'male'){continue;}//special case: m has no hair front.
			
			const sprList = portraits[draw][ch.gender];
			const sprIdx = ch[draw]%sprList.length;
			if(ch[draw]>=sprList.length){console.log("out of range...");}
			const sprName = sprList[sprIdx]
			const img = getSprData(sprName,ch.gender);
			
			const scale = 0.35;
			const x = (offsets[ch.gender][draw].x)*scale;//353,683 are dims of torso?
			const y = (-offsets[ch.gender][draw].y)*scale;
			
			const sprite = Renderer.getSprite(
				'RPG_Heroes_Pack/RPG_pack_128/'+img.name,
				x+128,y+500,img.width,img.height,0,0
			);
			Renderer.drawSpriteScaled(sprite,img.width*scale,img.height*scale,ctx);
		}
		
	}
	
	
}
export {ui_menuCharacter};