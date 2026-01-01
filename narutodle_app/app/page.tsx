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
import { url } from "inspector";

interface Character {
  name: string;
  images: string[];
  natureType?: string | string[];
  personal: {
    affiliation?: string[] | string;
    sex?: string;
    clan?: string | string[];
    kekkeiGenkai?: string | string[];
    species?: string;
  };
}

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
  const open = Boolean(anchorEl);
  useEffect(() => {
    fetch("https://dattebayo-api.onrender.com/characters?page=1&limit=100")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.characters);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    console.log(random);
    setCharacterToGuess(characters[random]);
  }, [score, characters]);

  const handleDialogButton = () => {
    setSelected([]);
    setScore(prev => prev + 1);
    setRoundDone(false);
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-[url(/bg.jpg)] bg-fixed bg-cover"
      style={{ backgroundPosition: "center calc(50% + 30px)" }}
    >
      <div className="flex flex-col gap-5 justify-center items-center mt-5">
        <img
          src="/transparent_logo.png"
          alt="naruto logo"
          width={400}
          className="mb-5 hover:scale-105 transition-all duration-200 ease-in-out"
        ></img>
        <div className="relative w-170 shadow-xl">
          <img
            src="/classroom.jpg"
            width={400}
            className="w-full rounded-2xl border-4 border-orange-700"
          ></img>
          <img
            src="/Iruka.webp"
            width={200}
            className="absolute bottom-5 left-8 drop-shadow-xl/30 hover:scale-104 transition-all duration-300"
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
          ></img>
          <div className="absolute top-10 right-70 bg-[#f5e6c8] border-3 border-orange-900 p-2.5 max-w-45 shadow-2xl/30 transition-all ease-in-out duration-200 hover:scale-103 text-center text-[14px] font-mono font-extrabold">
            <span className="text-orange-900">
              {" "}
              Hello Rookie! This is an infinite style <br /> naruto character
              guessing game. <br /> How far can you get?{" "}
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
            src="/kakashi.png"
            width={150}
            className="hover:scale-110 transition-all ease-in-out duration-300"
          />
          <h1 className="mr-10 text-shadow-lg/50">
            Enter a character below to start
          </h1>
        </div>
        <Autocomplete
          id="bar"
          open={autocompleteOpen}
          onOpen={() => setAutocompleteOpen(true)}
          onClose={() => setAutocompleteOpen(false)}
          onChange={(e, char) => {
            if (char) {
              setSelected((prev) => [char, ...prev]);
              setAnimationKey((prev) => prev + 1);
              if (char.name === characterToGuess?.name) {
                setTimeout(() => {
                  setRoundDone(true);
                }, 3000);
              }
            }
          }}
          autoHighlight
          autoSelect
          clearOnBlur
          disableClearable={false}
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
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
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
                  mx: 1,
                }}
                {...optionProps}
              >
                <img loading="lazy" width="55" src={option.images[0]} alt="" />
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
          {selected.map((e, index) => {
            return (
              <div
                className="grid grid-cols-6 gap-2 bg-[#F5E6C8] font-mono p-3 rounded-lg border-2 border-amber-500 items-center shadow-md"
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
                      : "bg-green-600 border-4 border-green-800") +
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
                          !Array.isArray(characterToGuess.personal.affiliation)
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
                              e.personal.affiliation?.slice(0, 2).includes(aff)
                            ) &&
                          characterToGuess.personal.affiliation.length ===
                            e.personal.affiliation.length
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
                      ? !Array.isArray(e.natureType) &&
                        Array.isArray(characterToGuess?.natureType)
                        ? characterToGuess.natureType
                            .slice(0, 3)
                            .includes(e.natureType)
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : Array.isArray(e.natureType) &&
                          Array.isArray(characterToGuess?.natureType)
                        ? e.natureType
                            .slice(0, 3)
                            .every((nat) =>
                              characterToGuess.natureType
                                ?.slice(0, 3)
                                .includes(nat)
                            )
                          ? "bg-green-600 border-4 border-green-800 text-white"
                          : characterToGuess.natureType
                              .slice(0, 3)
                              .some((nat) =>
                                e.natureType?.slice(0, 3).includes(nat)
                              )
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : Array.isArray(e.natureType) &&
                          !Array.isArray(characterToGuess?.natureType)
                        ? e.natureType
                            .slice(0, 3)
                            .includes(characterToGuess?.natureType)
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : !Array.isArray(e.natureType) &&
                          !Array.isArray(characterToGuess?.natureType)
                        ? e.natureType === characterToGuess?.natureType
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
                  }}
                >
                  {Array.isArray(e.natureType)
                    ? e.natureType
                        .slice(0, 3)
                        .join(", ")
                        .replace(/\s*[\(\[\{].*?[\)\]\}]\s*/g, "")
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
                            .includes(characterToGuess?.personal.clan as string)
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
                          Array.isArray(characterToGuess?.personal.kekkeiGenkai)
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
                              characterToGuess?.personal.kekkeiGenkai as string
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
          })}
        </div>
        <Dialog
          open={roundDone}
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
              <img src="/madara.png" width={120} />
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
                src="/roundDone.gif"
                width={355}
                className="rounded-xl shadow-xl/40 mb-3"
              ></img>
              <h1 className="text-xl">The character was:</h1>
              <img
                src={characterToGuess?.images[0]}
                width={100}
                className="rounded-xl shadow-lg/40 hover:scale-110 transition-transform ease-in-out duration-200"
              ></img>
              <h2 className="text-md">{characterToGuess?.name}</h2>
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
                alignItems: "center"
              }}
              onClick={handleDialogButton}
            >
              <p className="mt-1 text-shadow-lg/40">Next Round</p>
              <img src="/naruto_run.png" width={35}></img>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
