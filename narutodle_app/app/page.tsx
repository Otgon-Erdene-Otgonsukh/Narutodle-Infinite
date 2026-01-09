"use client";

import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Popover from "@mui/material/Popover";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Character {
  name: string;
  debut: {
    anime: string;
  };
  images: string[];
  natureType?: string[];
  personal: {
    affiliation?: string[] | string;
    sex?: string;
    clan?: string | string[];
    kekkeiGenkai?: string | string[];
    species?: string;
    status?: string;
  };
}

const Rank = [
  "/ranks/rookie.png",
  "/ranks/genin.png",
  "/ranks/chunin.png",
  "/ranks/e_nin.png",
  "/ranks/d_nin.png",
  "/ranks/b-miss.png",
  "/ranks/jonin.png",
  "/ranks/a_nin.png",
  "/ranks/s_nin.png",
  "/ranks/special_jonin.png",
  "/ranks/anbu.png",
  "/ranks/anbu_captain.png",
  "/ranks/kage.png",
];

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option: Character) => option.name,
});

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selected, setSelected] = useState<Character[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
  const [characterToGuess, setCharacterToGuess] = useState<Character>();
  const [roundDone, setRoundDone] = useState(false);
  const [score, setScore] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [health, setHealth] = useState(100);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [give, setGive] = useState(true);

  const [vitalShow, setVitalShow] = useState(false);
  const [debutShow, setDebutShow] = useState(false);
  const [letterShow, setLetterShow] = useState(false);

  // hints
  const [vitalHint, setVitalHint] = useState(true);
  const [debutHint, setDebutHint] = useState(true);
  const [letterHint, setLetterHint] = useState(true);

  // Pop over
  const open = Boolean(anchorEl);

  // Fetch relevant characters [array]
  useEffect(() => {
    const characterIds = [
      1, 6, 13, 17, 29, 40, 42, 80, 125, 152, 159, 165, 190, 193, 194, 210, 107,
      212, 221, 259, 261, 293, 341, 344, 345, 356, 363, 374, 376, 388, 421, 428,
      429, 430, 435, 436, 437, 439, 444, 466, 515, 517, 521, 558, 577, 591, 593,
      596, 609, 626, 636, 637, 684, 739, 809, 813, 831, 835, 844, 861, 865, 878,
      898, 903, 920, 925, 928, 934, 935, 938, 940, 941, 942, 967, 1008, 1015,
      1019, 1027, 1034, 1036, 1037, 1042, 1063, 1066, 1091, 1093, 1122, 1203,
      1208, 1216, 1223, 1280, 1289, 1293, 1296, 1299, 1300, 1303, 1306, 1307,
      1309, 1310, 1325, 1335, 1339, 1340, 1341, 1343, 1344, 1356, 1359, 1365,
      1367, 1373, 1397, 1426, 1425,
    ];
    const ids = characterIds.join(",");

    fetch(`https://dattebayo-api.onrender.com/characters/${ids}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const random = Math.floor(Math.random() * characters.length);
    setCharacterToGuess(characters[random]);
  }, [score, characters]);

  const handleDialogButton = () => {
    setSelected([]);
    setVitalHint(true);
    setDebutHint(true);
    setLetterHint(true);
    setVitalShow(false);
    setLetterShow(false);
    setDebutShow(false);
    setScore((prev) => prev + 1);
    setRoundDone(false);
    setDialogOpen(false);
  };

  const handleTatakae = () => {
    setSelected([]);
    setGameOver(false);
    setVitalHint(true);
    setDebutHint(true);
    setLetterHint(true);
    setVitalShow(false);
    setLetterShow(false);
    setDebutShow(false);
    setScore(0);
    setHealth(100);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-[url(/assets/bg.jpg)] bg-fixed bg-cover"
      style={{ backgroundPosition: "center calc(50% + 30px)" }}
    >
      <div className="flex flex-col gap-5 justify-center items-center mt-5">
        <img
          src="/assets/transparent_logo.png"
          alt="naruto logo"
          width={400}
          className="mb-5 hover:scale-105 transition-all duration-200 ease-in-out"
        ></img>
        <div className="relative w-170 shadow-xl">
          <img
            src="/assets/classroom.jpg"
            width={400}
            className="w-full rounded-2xl border-4 border-orange-700"
          ></img>
          <img
            src="/assets/Iruka.webp"
            width={200}
            className="absolute bottom-5 left-8 drop-shadow-xl/30 hover:scale-104 transition-all duration-300"
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
          ></img>
          <div className="absolute top-10 right-70 bg-[#f5e6c8] border-3 border-orange-900 p-2.5 max-w-45 shadow-2xl/30 transition-all ease-in-out duration-200 hover:scale-103 text-center text-[14px] font-mono font-extrabold">
            <span className="text-orange-900">
              {" "}
              Hello Rookie! This is an{" "}
              <span className="text-white font-(family-name:--font-ninja) font-light text-xs tracking-wider text-shadow-lg/60">
                infinite
              </span>{" "}
              style <br /> naruto character guessing game. <br /> How far can
              you get and what{" "}
              <span className="text-white font-(family-name:--font-ninja) font-light text-xs tracking-widest text-shadow-lg/60">
                shinobi rank
              </span>{" "}
              can you reach ?{" "}
            </span>
          </div>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          disableRestoreFocus
          disableScrollLock
          sx={{ pointerEvents: "none" }}
        >
          <p className="font-mono bg-[#f5e6c8] border-2 border-orange-900 text-orange-900 px-2">
            Iruka
          </p>
        </Popover>
        <div className="font-(family-name:--font-ninja) bg-linear-to-r from-orange-600 via-orange-500 to-amber-500 p-3 tracking-widest flex items-center rounded-xl shadow-2xl/40">
          <img
            src="/assets/kakashi.png"
            width={150}
            className="hover:scale-110 transition-all ease-in-out duration-300"
          />
          <h1 className="mr-10 text-shadow-lg/50">
            Enter a character below to start
          </h1>
        </div>
        <div className="bg-[#F5E6C8] border-3 border-[#7c2d12] flex flex-col justify-center items-center p-2 rounded-xl">
          <h1 className="font-mono text-orange-700 font-bold text-shadow-lg/10 text-2xl tracking-widest my-2">
            Hints
          </h1>
          <div className="flex justify-center items-center p-1 gap-3">
            <Button
              className="flex flex-col w-1/3"
              disabled={vitalHint}
              onClick={() => setVitalShow((prev) => !prev)}
            >
              <img
                src="/assets/vital.png"
                width={50}
                className={`drop-shadow-lg/20 ${
                  vitalHint ? "opacity-30 grayscale" : ""
                }`}
              ></img>
              <h1
                className={`font-mono font-bold ${
                  vitalHint ? "text-gray-400" : "text-orange-700"
                }`}
              >
                Vital Status
              </h1>
              {(5 - selected.length > 0 && (
                <p className="text-[10px] text-orange-400">
                  Available after{" "}
                  <strong className="text-orange-800 text-[11px]">
                    {5 - selected.length}
                  </strong>{" "}
                  guesses
                </p>
              )) || (
                <p className="text-[10px] text-orange-400">
                  Click to view hint
                </p>
              )}
              {vitalShow && (
                <p className="bg-yellow-200 px-1 mt-2 border-2 border-[#7c2d12] rounded-md font-mono text-[#7c2d12]">
                  {(characterToGuess?.personal.status &&
                    characterToGuess.personal.status) ||
                    "Alive"}
                </p>
              )}
            </Button>
            <Button
              className="flex flex-col w-1/3"
              disabled={debutHint}
              onClick={() => setDebutShow((prev) => !prev)}
            >
              <img
                src="/assets/cover.jpg"
                width={28}
                className={`drop-shadow-lg/20 rounded-md ${
                  debutHint ? "opacity-30 grayscale" : ""
                }`}
              ></img>
              <h1
                className={`font-mono tracking-widest font-bold ${
                  debutHint ? "text-gray-400" : "text-orange-700"
                }`}
              >
                Anime Debut
              </h1>
              {(7 - selected.length > 0 && (
                <p className="text-[10px] text-orange-400">
                  Available after{" "}
                  <strong className="text-orange-800 text-[11px]">
                    {7 - selected.length}
                  </strong>{" "}
                  guesses
                </p>
              )) || (
                <p className="text-[10px] text-orange-400">
                  Click to view hint
                </p>
              )}
              {debutShow && (
                <p className="bg-yellow-200 px-1 mt-2 border-2 border-[#7c2d12] font-mono rounded-md text-xs text-[#7c2d12]">
                  {characterToGuess?.debut.anime}
                </p>
              )}
            </Button>
            <Button
              className="flex flex-col w-1/3"
              disabled={letterHint}
              onClick={() => setLetterShow((prev) => !prev)}
            >
              <img
                src="/assets/letter.png"
                width={50}
                className={`drop-shadow-lg/20 ${
                  letterHint ? "opacity-30 grayscale" : ""
                }`}
              ></img>
              <h1
                className={`font-mono font-bold ${
                  letterHint ? "text-gray-400" : "text-orange-700"
                }`}
              >
                First Letter
              </h1>
              {(9 - selected.length > 0 && (
                <p className="text-[10px] text-orange-400">
                  Available after{" "}
                  <strong className="text-orange-800 text-[11px]">
                    {9 - selected.length}
                  </strong>{" "}
                  guesses
                </p>
              )) || (
                <p className="text-[10px] text-orange-400">
                  Click to view hint
                </p>
              )}
              {letterShow && (
                <p className="bg-yellow-200 px-1 mt-2 border-2 border-[#7c2d12] font-mono text-md text-[#7c2d12] rounded-md">
                  {characterToGuess?.name.charAt(0)}
                </p>
              )}
            </Button>
          </div>
        </div>
        {roundDone && (
          <Button
            sx={{
              background:
                "linear-gradient(to right, #ea580c, #f97316, #fbbf24)",
              color: "white",
              "&:hover": {
                background:
                  "linear-gradient(to right, #c2410c, #ea580c, #f59e0b)",
                transform: "scale(1.03)",
              },
              transition: "all 0.2s ease",
              mr: 3,
              mb: 2,
              fontFamily: "var(--font-ninja)",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
            onClick={handleDialogButton}
          >
            <p className="mt-1 text-shadow-lg/40">Next Round</p>
            <img src="/assets/naruto_run.png" width={35}></img>
          </Button>
        )}
        {gameOver && (
          <Button
            onClick={handleTatakae}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(to right, #ea580c, #f97316, #fbbf24)",
              "&:hover": {
                background:
                  "linear-gradient(to right, #c2410c, #ea580c, #f59e0b)",
                transform: "scale(1.03)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <p className="font-mono text-white text-shadow-lg/40">Tatakae</p>
            <img
              src="/assets/try.png"
              width={45}
              className="drop-shadow-lg/40 -mr-2"
            ></img>
          </Button>
        )}
        <div className="flex gap-4">
          <div className="flex gap-3 h-16 justify-center items-center bg-[#F5E6C8] border-4 border-[#7c2d12] text-shadow-lg/60 tracking-widest p-1 px-2 rounded-xl font-(family-name:--font-ninja)">
            <p>Shinobi Rank: </p>
            <img
              src={score > 12 ? Rank[12] : Rank[score]}
              width={150}
              className="mb-3.5 -mt-1 drop-shadow-lg/40 hover:scale-108 transition-all ease-in-out duration-200"
            ></img>
          </div>
          <Autocomplete
            disabled={gameOver || roundDone}
            id="bar"
            value={null}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            open={autocompleteOpen}
            onOpen={() => setAutocompleteOpen(true)}
            onClose={() => setAutocompleteOpen(false)}
            onChange={(e, char) => {
              if (char) {
                let guessCount = selected.length + 1;
                setSelected((prev) => [char, ...prev]);
                setAnimationKey((prev) => prev + 1);

                let SexPoint = 0;
                let AffPoint = 0;
                let NaturePoint = 0;
                let ClanPoint = 0;
                let KekkeiPoint = 0;

                // Calculate sexPoint based on the match
                if (char.personal.sex && characterToGuess?.personal.sex) {
                  if (char.personal.sex === characterToGuess.personal.sex) {
                    SexPoint = 1;
                  } else {
                    SexPoint = -2;
                  }
                } else if (
                  !characterToGuess?.personal.sex &&
                  !char.personal.sex
                ) {
                  if (
                    characterToGuess?.personal.species === char.personal.species
                  ) {
                    SexPoint = 1;
                  } else {
                    SexPoint = -2;
                  }
                } else {
                  SexPoint = -2;
                }

                // Calculate affPoint
                if (
                  char.personal.affiliation &&
                  characterToGuess?.personal.affiliation
                ) {
                  if (
                    !Array.isArray(char.personal.affiliation) &&
                    !Array.isArray(characterToGuess.personal.affiliation)
                  ) {
                    AffPoint =
                      char.personal.affiliation ===
                      characterToGuess.personal.affiliation
                        ? 1
                        : -2;
                  } else if (
                    !Array.isArray(char.personal.affiliation) &&
                    Array.isArray(characterToGuess.personal.affiliation)
                  ) {
                    AffPoint = characterToGuess.personal.affiliation
                      .slice(0, 2)
                      .includes(char.personal.affiliation)
                      ? 0
                      : -2;
                  } else if (
                    Array.isArray(char.personal.affiliation) &&
                    !Array.isArray(characterToGuess.personal.affiliation)
                  ) {
                    AffPoint = char.personal.affiliation
                      .slice(0, 2)
                      .includes(characterToGuess.personal.affiliation)
                      ? 0
                      : -2;
                  } else if (
                    Array.isArray(char.personal.affiliation) &&
                    Array.isArray(characterToGuess.personal.affiliation)
                  ) {
                    if (
                      characterToGuess.personal.affiliation
                        .slice(0, 2)
                        .every((aff) =>
                          char.personal.affiliation?.slice(0, 2).includes(aff)
                        ) 
                    ) {
                      AffPoint = 1;
                    } else if (
                      characterToGuess.personal.affiliation
                        .slice(0, 2)
                        .some((aff) =>
                          char.personal.affiliation?.slice(0, 2).includes(aff)
                        )
                    ) {
                      AffPoint = 0;
                    } else {
                      AffPoint = -2;
                    }
                  } else {
                    AffPoint = -2;
                  }
                } else if (
                  characterToGuess?.personal.affiliation ||
                  char.personal.affiliation
                ) {
                  AffPoint = -2;
                } else {
                  AffPoint = 1;
                }

                // Calculate naturePoint
                if (characterToGuess?.natureType && char.natureType) {
                  if (
                    char.natureType.length === 1 &&
                    characterToGuess.natureType.length > 1
                  ) {
                    NaturePoint = characterToGuess.natureType
                      .slice(0, 3)
                      .includes(char.natureType[0])
                      ? 0
                      : -2;
                  } else if (
                    char.natureType.length > 1 &&
                    characterToGuess.natureType.length > 1
                  ) {
                    if (
                      char.natureType
                        .slice(0, 3)
                        .every((nat) =>
                          characterToGuess.natureType?.slice(0, 3).includes(nat)
                        )
                    ) {
                      NaturePoint = 1;
                    } else if (
                      characterToGuess.natureType
                        .slice(0, 3)
                        .some((nat) =>
                          char.natureType?.slice(0, 3).includes(nat)
                        )
                    ) {
                      NaturePoint = 0;
                    } else {
                      NaturePoint = -2;
                    }
                  } else if (
                    char.natureType.length > 1 &&
                    characterToGuess.natureType.length === 1
                  ) {
                    NaturePoint = char.natureType
                      .slice(0, 3)
                      .includes(characterToGuess.natureType[0])
                      ? 0
                      : -2;
                  } else if (
                    char.natureType.length === 1 &&
                    characterToGuess.natureType.length === 1
                  ) {
                    NaturePoint =
                      char.natureType[0] === characterToGuess.natureType[0]
                        ? 1
                        : -2;
                  } else {
                    NaturePoint = -2;
                  }
                } else if (characterToGuess?.natureType || char.natureType) {
                  NaturePoint = -2;
                } else {
                  NaturePoint = 1;
                }

                // Calculate clanPoint
                if (characterToGuess?.personal.clan && char.personal.clan) {
                  if (
                    !Array.isArray(char.personal.clan) &&
                    Array.isArray(characterToGuess.personal.clan)
                  ) {
                    ClanPoint = characterToGuess.personal.clan
                      .slice(0, 2)
                      .includes(char.personal.clan)
                      ? 0
                      : -2;
                  } else if (
                    Array.isArray(char.personal.clan) &&
                    Array.isArray(characterToGuess.personal.clan)
                  ) {
                    if (
                      char.personal.clan
                        .slice(0, 2)
                        .every((clan) =>
                          characterToGuess.personal.clan
                            ?.slice(0, 2)
                            .includes(clan)
                        )
                    ) {
                      ClanPoint = 1;
                    } else if (
                      characterToGuess.personal.clan
                        .slice(0, 2)
                        .some((clan) =>
                          char.personal.clan?.slice(0, 2).includes(clan)
                        )
                    ) {
                      ClanPoint = 0;
                    } else {
                      ClanPoint = -2;
                    }
                  } else if (
                    Array.isArray(char.personal.clan) &&
                    !Array.isArray(characterToGuess.personal.clan)
                  ) {
                    ClanPoint = char.personal.clan
                      .slice(0, 2)
                      .includes(characterToGuess.personal.clan as string)
                      ? 0
                      : -2;
                  } else if (
                    !Array.isArray(char.personal.clan) &&
                    !Array.isArray(characterToGuess.personal.clan)
                  ) {
                    ClanPoint =
                      char.personal.clan === characterToGuess.personal.clan
                        ? 1
                        : -2;
                  } else {
                    ClanPoint = -2;
                  }
                } else if (
                  characterToGuess?.personal.clan ||
                  char.personal.clan
                ) {
                  ClanPoint = -2;
                } else {
                  ClanPoint = 1;
                }

                // Calculate kekkeiPoint
                if (
                  characterToGuess?.personal.kekkeiGenkai &&
                  char.personal.kekkeiGenkai
                ) {
                  if (
                    !Array.isArray(char.personal.kekkeiGenkai) &&
                    Array.isArray(characterToGuess.personal.kekkeiGenkai)
                  ) {
                    KekkeiPoint = characterToGuess.personal.kekkeiGenkai
                      .slice(0, 2)
                      .includes(char.personal.kekkeiGenkai)
                      ? 0
                      : -2;
                  } else if (
                    Array.isArray(char.personal.kekkeiGenkai) &&
                    Array.isArray(characterToGuess.personal.kekkeiGenkai)
                  ) {
                    if (
                      char.personal.kekkeiGenkai
                        .slice(0, 2)
                        .every((kkg) =>
                          characterToGuess.personal.kekkeiGenkai
                            ?.slice(0, 2)
                            .includes(kkg)
                        )
                    ) {
                      KekkeiPoint = 1;
                    } else if (
                      characterToGuess.personal.kekkeiGenkai
                        .slice(0, 2)
                        .some((kkg) =>
                          char.personal.kekkeiGenkai?.slice(0, 2).includes(kkg)
                        )
                    ) {
                      KekkeiPoint = 0;
                    } else {
                      KekkeiPoint = -2;
                    }
                  } else if (
                    Array.isArray(char.personal.kekkeiGenkai) &&
                    !Array.isArray(characterToGuess.personal.kekkeiGenkai)
                  ) {
                    KekkeiPoint = char.personal.kekkeiGenkai
                      .slice(0, 2)
                      .includes(
                        characterToGuess.personal.kekkeiGenkai as string
                      )
                      ? 0
                      : -2;
                  } else if (
                    !Array.isArray(char.personal.kekkeiGenkai) &&
                    !Array.isArray(characterToGuess.personal.kekkeiGenkai)
                  ) {
                    KekkeiPoint =
                      char.personal.kekkeiGenkai ===
                      characterToGuess.personal.kekkeiGenkai
                        ? 1
                        : -2;
                  } else {
                    KekkeiPoint = -1;
                  }
                } else if (
                  characterToGuess?.personal.kekkeiGenkai ||
                  char.personal.kekkeiGenkai
                ) {
                  KekkeiPoint = -2;
                } else {
                  KekkeiPoint = 1;
                }

                if (
                  health +
                    SexPoint +
                    AffPoint +
                    NaturePoint +
                    ClanPoint +
                    KekkeiPoint <=
                  0
                ) {
                  setHealth(0);
                  setTimeout(() => {
                    setGameOver(true);
                  }, 2800);
                } else {
                  // Update health
                  setHealth(
                    (prev) =>
                      prev +
                      SexPoint +
                      AffPoint +
                      NaturePoint +
                      ClanPoint +
                      KekkeiPoint
                  );
                }

                // Hint availability
                if (guessCount >= 5) {
                  setVitalHint(false);
                }
                if (guessCount >= 7) {
                  setDebutHint(false);
                }
                if (guessCount >= 9) {
                  setLetterHint(false);
                }

                // Guess is correct logic
                if (char.name === characterToGuess?.name) {
                  setTimeout(() => {
                    setRoundDone(true);
                    setDialogOpen(true);
                  }, 2300);
                }

                // Clear input on selection to make it easier to input the next character
                setInputValue("");
              }
            }}
            autoHighlight
            autoSelect
            clearOnBlur
            slotProps={{
              popper: {
                onMouseLeave: () => setAutocompleteOpen(false),
              },
            }}
            sx={{
              width: 300,
              bgcolor: "#F5E6C8",
              borderRadius: 3,
              border: 4,
              borderColor: "#7c2d12",
              mb: 50,
              "& .MuiInputBase-input": {
                fontFamily: "monospace",
                color: "#7c2d12",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#7c2d12",
                  borderWidth: "1px",
                },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderWidth: "1px",
                  borderColor: "#7c2d12",
                },
            }}
            options={characters.filter((e) => !selected.includes(e))}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{
                    "& > img": { mr: 2, flexShrink: 0 },
                    border: 2,
                    borderRight: 4,
                    borderLeft: 4,
                    borderColor: "#7a2d12",
                    bgcolor: "#F5E6C8",
                  }}
                  {...optionProps}
                >
                  <img
                    loading="lazy"
                    width="55"
                    src={option.images[0]}
                    alt=""
                  />
                  {option.name}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                  },
                }}
              />
            )}
            filterOptions={filterOptions}
          ></Autocomplete>
          <div className="flex max-h-16 justify-center items-center bg-[#F5E6C8] border-4 border-[#7c2d12] p-1 rounded-xl font-(family-name:--font-ninja)">
            <img
              src="/assets/heart.png"
              width={55}
              className="object-contain hover:scale-105 transition-transform ease-in-out duration-200 drop-shadow-lg/50"
            />
            <span className="mr-2 text-white text-shadow-lg/40">
              x {health}
            </span>
            <div className="flex flex-col text-xs mr-1.5">
              <div className="flex justify-center items-center text-green-600 gap-1 drop-shadow-lg/30">
                <div className="h-2.5 w-2.5 bg-green-600"></div>
                <p>+ 1</p>
              </div>
              <div className="flex justify-center items-center text-yellow-500 gap-1 drop-shadow-lg/30">
                <div className="h-2.5 w-2.5 bg-yellow-500"></div>
                <p>+ 0</p>
              </div>
              <div className="flex justify-center items-center text-red-600 gap-1 drop-shadow-lg/40">
                <div className="h-2.5 w-2.5 bg-red-600"> </div>
                <p>- 2</p>
              </div>
            </div>
          </div>
          <div
            id="score"
            className="flex justify-center h-16 items-center bg-[#F5E6C8] border-4 border-[#7c2d12] p-1 px-2 rounded-xl font-(family-name:--font-ninja) text-shadow-lg/50 tracking-widest"
          >
            <img
              src="/assets/score.png"
              className="drop-shadow-lg/60 mb-1 hover:scale-115 transition-all ease-in-out duration-200"
              width={30}
            />
            <p>Score: {score}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 -mt-100 mb-80 w-full max-w-4xl px-4 font-mono">
          {selected.length > 0 && (
            <div className="grid grid-cols-6 gap-2 font-bold text-orange-900 bg-amber-100 p-3 rounded-lg border-2 border-amber-600">
              <div className="text-center">Character</div>
              <div className="text-center">Gender</div>
              <div className="text-center">Affiliation</div>
              <div className="text-center">Nature Type</div>
              <div className="text-center">Clan</div>
              <div className="text-center">Kekkei Genkai</div>
            </div>
          )}
          {(selected.length !== 0 &&
            selected.map((e, index) => {
              return (
                <div
                  className="grid grid-cols-6 gap-2 bg-[#F5E6C8] font-mono p-3 rounded-lg border-2 border-amber-500 items-center shadow-md min-h-30"
                  key={index}
                >
                  <div className="flex justify-center">
                    <img
                      src={e.images[0]}
                      width={110}
                      className="rounded-md border-3 border-amber-900"
                      alt={e.name}
                    ></img>
                  </div>
                  <div
                    key={`${index}-${animationKey}`} //unique key is created to trigger animation on the most recent guess
                    className={
                      (e.personal.sex && characterToGuess?.personal.sex
                        ? e.personal.sex === characterToGuess.personal.sex
                          ? "bg-green-600 border-4 border-green-800"
                          : "bg-red-600 border-4 border-red-800"
                        : characterToGuess?.personal.sex || e.personal.sex
                        ? "bg-red-600 border-4 border-red-800"
                        : characterToGuess?.personal.species ===
                          e.personal.species
                        ? "bg-green-600 border-4 border-green-800"
                        : "bg-red-600 border-4 border-red-800") +
                      " text-sm rounded-lg flex justify-center items-center h-full"
                    }
                    style={{
                      animation: index === 0 ? "flip 0.6s ease-in-out" : "none",
                    }}
                  >
                    {(e.personal.sex &&
                      (!e.personal.sex.startsWith("M") &&
                      !e.personal.sex.startsWith("Fe")
                        ? "Unknown"
                        : e.personal.sex)) ||
                      e.personal.species}
                  </div>
                  <div
                    key={`${index}-aff-${animationKey}`}
                    className={
                      (e.personal.affiliation &&
                      characterToGuess?.personal.affiliation
                        ? !Array.isArray(e.personal.affiliation) &&
                          !Array.isArray(characterToGuess.personal.affiliation)
                          ? e.personal.affiliation ===
                            characterToGuess.personal.affiliation
                            ? "bg-green-600 border-4 border-green-800"
                            : "bg-red-600 border-4 border-red-800"
                          : !Array.isArray(e.personal.affiliation) &&
                            Array.isArray(characterToGuess.personal.affiliation)
                          ? characterToGuess.personal.affiliation
                              .slice(0, 2)
                              .includes(e.personal.affiliation)
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800"
                          : Array.isArray(e.personal.affiliation) &&
                            !Array.isArray(
                              characterToGuess.personal.affiliation
                            )
                          ? e.personal.affiliation
                              .slice(0, 2)
                              .includes(characterToGuess.personal.affiliation)
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800"
                          : Array.isArray(e.personal.affiliation) &&
                            Array.isArray(characterToGuess.personal.affiliation)
                          ? characterToGuess.personal.affiliation
                              .slice(0, 2)
                              .every((aff) =>
                                e.personal.affiliation
                                  ?.slice(0, 2)
                                  .includes(aff)
                              )
                            ? "bg-green-600 border-4 border-green-800"
                            : characterToGuess.personal.affiliation
                                .slice(0, 2)
                                .some((aff) =>
                                  e.personal.affiliation
                                    ?.slice(0, 2)
                                    .includes(aff)
                                )
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800"
                          : "bg-red-600 border-4 border-red-800"
                        : characterToGuess?.personal.affiliation ||
                          e.personal.affiliation
                        ? "bg-red-600 border-4 border-red-800"
                        : "bg-green-600 border-4 border-green-800") +
                      " flex justify-center items-center rounded-lg text-center h-full p-1"
                    }
                    style={{
                      animation: index === 0 ? "flip 1s ease-in-out" : "none",
                      fontSize:
                        Array.isArray(e.personal.affiliation) &&
                        e.personal.affiliation
                          ?.slice(0, 2)
                          .join(", ")
                          .includes("(")
                          ? 11
                          : 14,
                    }}
                  >
                    {(e.personal.affiliation &&
                      (Array.isArray(e.personal.affiliation)
                        ? e.personal.affiliation.slice(0, 2).join(", ")
                        : e.personal.affiliation)) ||
                      "None"}
                  </div>
                  <div
                    key={`${index}-nature-${animationKey}`}
                    className={
                      (characterToGuess?.natureType && e.natureType
                        ? e.natureType.length === 1 &&
                          characterToGuess.natureType.length > 1
                          ? characterToGuess.natureType
                              .slice(0, 3)
                              .includes(e.natureType[0])
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : e.natureType.length > 1 &&
                            characterToGuess.natureType.length > 1
                          ? characterToGuess.natureType
                              .slice(0, 3)
                              .every((nat) =>
                                e.natureType?.slice(0, 3).includes(nat)
                              ) && characterToGuess.natureType.length === e.natureType.length
                            ? "bg-green-600 border-4 border-green-800 text-white"
                            : characterToGuess.natureType
                              .slice(0, 3)
                              .every((nat) =>
                                e.natureType?.slice(0, 3).includes(nat)
                              ) && characterToGuess.natureType.length !== e.natureType.length ?
                              "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : characterToGuess.natureType
                                .slice(0, 3)
                                .some((nat) =>
                                  e.natureType?.slice(0, 3).includes(nat)
                                )
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : e.natureType.length > 1 &&
                            characterToGuess.natureType.length === 1
                          ? e.natureType
                              .slice(0, 3)
                              .includes(characterToGuess?.natureType[0])
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : e.natureType.length === 1 &&
                            characterToGuess.natureType.length === 1
                          ? e.natureType[0] === characterToGuess?.natureType[0]
                            ? "bg-green-600 border-4 border-green-800 text-white"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : characterToGuess?.natureType || e.natureType
                        ? "bg-red-600 border-4 border-red-800 text-white"
                        : "bg-green-600 border-4 border-green-800 text-white") +
                      " text-center text-sm flex items-center rounded-lg justify-center h-full"
                    }
                    style={{
                      animation: index === 0 ? "flip 1.4s ease-in-out" : "none",
                      fontSize:
                        Array.isArray(e.natureType) &&
                        e.natureType?.slice(0, 2).join(", ").includes("(")
                          ? 11
                          : 14,
                    }}
                  >
                    {Array.isArray(e.natureType)
                      ? e.natureType.slice(0, 3).join(", ")
                      : e.natureType
                      ? e.natureType
                      : "None"}
                  </div>
                  <div
                    key={`${index}-clan-${animationKey}`}
                    className={
                      (characterToGuess?.personal.clan && e.personal.clan
                        ? !Array.isArray(e.personal.clan) &&
                          Array.isArray(characterToGuess?.personal.clan)
                          ? characterToGuess.personal.clan
                              .slice(0, 2)
                              .includes(e.personal.clan)
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : Array.isArray(e.personal.clan) &&
                            Array.isArray(characterToGuess?.personal.clan)
                          ? e.personal.clan
                              .slice(0, 2)
                              .every((clan) =>
                                characterToGuess.personal.clan
                                  ?.slice(0, 2)
                                  .includes(clan)
                              )
                            ? "bg-green-600 border-4 border-green-800 text-white"
                            : characterToGuess.personal.clan
                                .slice(0, 2)
                                .some((clan) =>
                                  e.personal.clan?.slice(0, 2).includes(clan)
                                )
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : Array.isArray(e.personal.clan) &&
                            !Array.isArray(characterToGuess?.personal.clan)
                          ? e.personal.clan
                              .slice(0, 2)
                              .includes(
                                characterToGuess?.personal.clan as string
                              )
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : !Array.isArray(e.personal.clan) &&
                            !Array.isArray(characterToGuess?.personal.clan)
                          ? e.personal.clan === characterToGuess?.personal.clan
                            ? "bg-green-600 border-4 border-green-800 text-white"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : characterToGuess?.personal.clan || e.personal.clan
                        ? "bg-red-600 border-4 border-red-800 text-white"
                        : "bg-green-600 border-4 border-green-800 text-white") +
                      " text-center p-1 text-sm flex items-center rounded-lg justify-center h-full"
                    }
                    style={{
                      animation: index === 0 ? "flip 1.8s ease-in-out" : "none",
                    }}
                  >
                    {e.personal.clan && Array.isArray(e.personal.clan)
                      ? e.personal.clan.slice(0, 2).join(", ")
                      : e.personal.clan && !Array.isArray(e.personal.clan)
                      ? e.personal.clan
                      : "None"}
                  </div>
                  <div
                    key={`${index}-kekkei-${animationKey}`}
                    className={
                      (characterToGuess?.personal.kekkeiGenkai &&
                      e.personal.kekkeiGenkai
                        ? !Array.isArray(e.personal.kekkeiGenkai) &&
                          Array.isArray(characterToGuess?.personal.kekkeiGenkai)
                          ? characterToGuess.personal.kekkeiGenkai
                              .slice(0, 2)
                              .includes(e.personal.kekkeiGenkai)
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : Array.isArray(e.personal.kekkeiGenkai) &&
                            Array.isArray(
                              characterToGuess?.personal.kekkeiGenkai
                            )
                          ? e.personal.kekkeiGenkai
                              .slice(0, 2)
                              .every((kkg) =>
                                characterToGuess.personal.kekkeiGenkai
                                  ?.slice(0, 2)
                                  .includes(kkg)
                              )
                            ? "bg-green-600 border-4 border-green-800 text-white"
                            : characterToGuess.personal.kekkeiGenkai
                                .slice(0, 2)
                                .some((kkg) =>
                                  e.personal.kekkeiGenkai
                                    ?.slice(0, 2)
                                    .includes(kkg)
                                )
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : Array.isArray(e.personal.kekkeiGenkai) &&
                            !Array.isArray(
                              characterToGuess?.personal.kekkeiGenkai
                            )
                          ? e.personal.kekkeiGenkai
                              .slice(0, 2)
                              .includes(
                                characterToGuess?.personal
                                  .kekkeiGenkai as string
                              )
                            ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : !Array.isArray(e.personal.kekkeiGenkai) &&
                            !Array.isArray(
                              characterToGuess?.personal.kekkeiGenkai
                            )
                          ? e.personal.kekkeiGenkai ===
                            characterToGuess?.personal.kekkeiGenkai
                            ? "bg-green-600 border-4 border-green-800 text-white"
                            : "bg-red-600 border-4 border-red-800 text-white"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : characterToGuess?.personal.kekkeiGenkai ||
                          e.personal.kekkeiGenkai
                        ? "bg-red-600 border-4 border-red-800 text-white"
                        : "bg-green-600 border-4 border-green-800 text-white") +
                      " text-center text-sm rounded-lg flex items-center justify-center h-full"
                    }
                    style={{
                      animation: index === 0 ? "flip 2.2s ease-in-out" : "none",
                    }}
                  >
                    {e.personal.kekkeiGenkai &&
                    Array.isArray(e.personal.kekkeiGenkai)
                      ? e.personal.kekkeiGenkai.slice(0, 2).join(", ")
                      : e.personal.kekkeiGenkai &&
                        !Array.isArray(e.personal.kekkeiGenkai)
                      ? e.personal.kekkeiGenkai
                      : "None"}
                  </div>
                </div>
              );
            })) || (
            <div className="bg-[#F5E6C8] border-4 border-orange-700 rounded-xl p-8 shadow-xl text-center">
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/assets/transparent_logo.png"
                  width={120}
                  className="opacity-30"
                  alt="logo"
                />
                <p className="font-mono text-orange-900 text-lg font-bold tracking-wide">
                  Your guesses will appear here
                </p>
                <p className="font-mono text-orange-700 text-sm">
                  Select a character above to begin!
                </p>
              </div>
            </div>
          )}
        </div>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          slotProps={{
            paper: {
              sx: {
                background:
                  "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)",
                borderRadius: 3,
                border: 5,
                borderColor: "#7c2d12",
              },
            },
          }}
        >
          <DialogTitle>
            <div className="flex items-center">
              <img src="/assets/madara.png" width={120} />
              <h1 className="font-(family-name:--font-ninja) tracking-widest text-rose-400 text-shadow-lg/40 mr-10">
                Maybe I underestimated you
              </h1>
            </div>
          </DialogTitle>
          <DialogContent
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div className="flex flex-col justify-center items-center gap-6 font-(family-name:--font-ninja) text-white text-shadow-lg/40 tracking-widest">
              <img
                src="/assets/roundDone.gif"
                width={355}
                className="rounded-xl shadow-xl/40 mb-3"
              ></img>
              <h1 className="text-xl">The character was:</h1>
              <img
                src={characterToGuess?.images[0]}
                width={150}
                className="rounded-xl shadow-lg/40 hover:scale-110 transition-transform ease-in-out duration-200"
              ></img>
              <h2 className="text-md">{characterToGuess?.name}</h2>
              <p className="font-mono text-shadow-lg/40 font-bold">
                Total guesses: {selected.length}
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                background:
                  "linear-gradient(to right, #ea580c, #f97316, #fbbf24)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #c2410c, #ea580c, #f59e0b)",
                  transform: "scale(1.03)",
                },
                transition: "all 0.2s ease",
                mr: 3,
                mb: 2,
                fontFamily: "var(--font-ninja)",
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
              onClick={handleDialogButton}
            >
              <p className="mt-1 text-shadow-lg/40">Next Round</p>
              <img src="/assets/naruto_run.png" width={35}></img>
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={() => {
            setGive(false);
          }}
          id="game_over"
          open={gameOver && give}
          slotProps={{
            paper: {
              sx: {
                background:
                  "linear-gradient(135deg, #1e293b 0%, #334155 40%, #475569 70%, #64748b 100%)",
                borderRadius: 3,
                border: 5,
                borderColor: "#1e293b",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <img src="/assets/lose.png" width={50}></img>
            <p className="font-(family-name:--font-ninja) tracking-widest text-white text-shadow-lg/50">
              The Journey ends here...
            </p>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div className="flex gap-2 justify-center items-center">
              <p className="font-(family-name:--font-ninja) tracking-widest text-white text-shadow-lg/50 text-[13px]">
                Achieved Shinobi Rank :
              </p>
              <img
                src={score > 12 ? Rank[12] : Rank[score]}
                width={140}
                className="mb-3 -mt-1"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <p className="font-(family-name:--font-ninja) tracking-widest text-white text-shadow-lg/50 text-[13px]">
                Score : {score}
              </p>
            </div>
            <div className="flex gap-2 justify-center items-center mt-6">
              <p className="font-(family-name:--font-ninja) tracking-widest text-white text-shadow-lg/50 text-[13px]">
                The Character was :
              </p>
              <div className="flex flex-col justify-center items-center gap-2">
                <img
                  src={characterToGuess?.images[0]}
                  width={80}
                  className="rounded-lg"
                />
                <p className="font-mono font-bold text-orange-400 text-shadow-lg/40">
                  {characterToGuess?.name}
                </p>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setGive(false);
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mr: 27,
                background:
                  "linear-gradient(to right, #7f1d1d, #991b1b, #b91c1c)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #991b1b, #b91c1c, #dc2626)",
                  transform: "scale(1.03)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <p className="font-mono text-white text-shadow-lg/40">Give up</p>
              <img
                src="/assets/give.png"
                width={45}
                className="drop-shadow-lg/40 -mr-2.5"
              ></img>
            </Button>
            <Button
              onClick={handleTatakae}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "linear-gradient(to right, #ea580c, #f97316, #fbbf24)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #c2410c, #ea580c, #f59e0b)",
                  transform: "scale(1.03)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <p className="font-mono text-white text-shadow-lg/40">Tatakae</p>
              <img
                src="/assets/try.png"
                width={45}
                className="drop-shadow-lg/40 -mr-2"
              ></img>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
