"use client";

import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Popover from "@mui/material/Popover";

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
  const [score, setScore] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const open = Boolean(anchorEl);
  useEffect(() => {
    fetch("https://dattebayo-api.onrender.com/characters?page=1&limit=100")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.characters);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    console.log(random);
    setCharacterToGuess(characters[79]);
  }, [score, characters]);

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
        <Autocomplete
          id="bar"
          onChange={(e, char) => {
            if (char) {
              setSelected((prev) => [char, ...prev]);
              setAnimationKey((prev) => prev + 1);
            }
          }}
          sx={{
            width: 300,
            bgcolor: "#F5E6C8",
            borderRadius: 1,
            mb: 50,
            "& .MuiInputBase-input": {
              fontFamily: "monospace",
              color: "#7c2d12",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#7c2d12",
              },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px",
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
                  borderColor: "salmon",
                  bgcolor: "#F5E6C8",
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
                  autoComplete: "new-password", // disable autocomplete and autofill
                },
              }}
            />
          )}
          filterOptions={filterOptions}
        ></Autocomplete>
        <div className="flex flex-col gap-3 -mt-100 mb-20 w-full max-w-4xl px-4 font-mono">
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
                      : "bg-green-600 border-4 border-green-800") + " text-sm rounded-md flex justify-center items-center h-full"
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
                <div className="text-center text-orange-900 text-sm">
                  {(e.personal.affiliation &&
                    (Array.isArray(e.personal.affiliation)
                      ? e.personal.affiliation[0]
                      : e.personal.affiliation)) ||
                    "None"}
                </div>
                <div
                  key={`${index}-nature-${animationKey}`}
                  className={
                    (characterToGuess?.natureType && e.natureType
                      ? !Array.isArray(e.natureType) &&
                        Array.isArray(characterToGuess?.natureType)
                        ? characterToGuess.natureType.includes(e.natureType)
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : Array.isArray(e.natureType) &&
                          Array.isArray(characterToGuess?.natureType)
                        ? e.natureType.every((nat) =>
                            characterToGuess.natureType?.includes(nat)
                          )
                          ? "bg-green-600 border-4 border-green-800 text-white"
                          : characterToGuess.natureType.some((nat) =>
                              e.natureType?.includes(nat)
                            )
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : Array.isArray(e.natureType) &&
                          !Array.isArray(characterToGuess?.natureType)
                        ? e.natureType.includes(
                            characterToGuess?.natureType as string
                          )
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
                    " text-center text-sm flex items-center justify-center h-full"
                  }
                  style={{
                    animation: index === 0 ? "flip 0.6s ease-in-out" : "none",
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
                        ? characterToGuess.personal.clan.includes(
                            e.personal.clan
                          )
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : Array.isArray(e.personal.clan) &&
                          Array.isArray(characterToGuess?.personal.clan)
                        ? e.personal.clan.every((clan) =>
                            characterToGuess.personal.clan?.includes(clan)
                          )
                          ? "bg-green-600 border-4 border-green-800 text-white"
                          : characterToGuess.personal.clan.some((clan) =>
                              e.personal.clan?.includes(clan)
                            )
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : Array.isArray(e.personal.clan) &&
                          !Array.isArray(characterToGuess?.personal.clan)
                        ? e.personal.clan.includes(
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
                    " text-center text-sm flex items-center justify-center h-full"
                  }
                  style={{
                    animation: index === 0 ? "flip 0.6s ease-in-out" : "none",
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
                        ? characterToGuess.personal.kekkeiGenkai.includes(
                            e.personal.kekkeiGenkai
                          )
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : Array.isArray(e.personal.kekkeiGenkai) &&
                          Array.isArray(characterToGuess?.personal.kekkeiGenkai)
                        ? e.personal.kekkeiGenkai.every((kkg) =>
                            characterToGuess.personal.kekkeiGenkai?.includes(
                              kkg
                            )
                          )
                          ? "bg-green-600 border-4 border-green-800 text-white"
                          : characterToGuess.personal.kekkeiGenkai.some((kkg) =>
                              e.personal.kekkeiGenkai?.includes(kkg)
                            )
                          ? "bg-yellow-400 border-4 border-amber-500 text-orange-900"
                          : "bg-red-600 border-4 border-red-800 text-white"
                        : Array.isArray(e.personal.kekkeiGenkai) &&
                          !Array.isArray(
                            characterToGuess?.personal.kekkeiGenkai
                          )
                        ? e.personal.kekkeiGenkai.includes(
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
                    " text-center text-sm flex items-center justify-center h-full"
                  }
                  style={{
                    animation: index === 0 ? "flip 0.6s ease-in-out" : "none",
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
      </div>
    </div>
  );
}
