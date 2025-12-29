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
  personal: {
    affiliation: string[];
    sex: string;
    clan?: string | string[];
    kekkeiGenkai?: string | string[];
    occupation?: string | string[];
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
  const open = Boolean(anchorEl);
  useEffect(() => {
    fetch("https://dattebayo-api.onrender.com/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.characters);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-[url(/bg.jpg)] bg-fixed bg-cover"
      style={{ backgroundPosition: "center calc(50% + 30px)" }}
    >
      <div className="flex flex-col gap-5 justify-center items-center mt-60">
        <div className="flex">
          <img
            src="/Iruka.webp"
            width={200}
            className="drop-shadow-xl/30 hover:scale-104 transition-all duration-300"
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
          ></img>
          <div className="bg-[#f5e6c8] border-3 border-orange-900 p-3 max-h-25 shadow-2xl/30 transition-all ease-in-out duration-200 hover:scale-103 text-center text-[14px] font-mono font-extrabold">
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
              borderColor: "#7c2d12"
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
        <div className="flex flex-col gap-3 -mt-100 mb-20 w-full max-w-4xl px-4">
          {selected.length > 0 && (
            <div className="grid grid-cols-6 gap-2 font-bold text-orange-900 bg-amber-100 p-3 rounded-lg border-2 border-amber-600">
              <div className="text-center">Character</div>
              <div className="text-center">Gender</div>
              <div className="text-center">Affiliation</div>
              <div className="text-center">Occupation</div>
              <div className="text-center">Clan</div>
              <div className="text-center">Kekkei Genkai</div>
            </div>
          )}
          {selected.map((e, index) => {
            return (
              <div
                className="grid grid-cols-6 gap-2 bg-[#F5E6C8] p-3 rounded-lg border-2 border-amber-500 items-center shadow-md"
                key={index}
              >
                <div className="flex justify-center">
                  <img
                    src={e.images[0]}
                    width={90}
                    className="rounded-md border-3 border-amber-900"
                    alt={e.name}
                  ></img>
                </div>
                <div className="text-center text-orange-900">
                  {e.personal.sex}
                </div>
                <div className="text-center text-orange-900 text-sm">
                  {e.personal.affiliation[0]}
                </div>
                <div className="text-center text-orange-900 text-sm">
                  {e.personal.occupation && Array.isArray(e.personal.occupation)
                    ? e.personal.occupation.slice(0, 2).join(", ")
                    : e.personal.occupation &&
                      !Array.isArray(e.personal.occupation)
                    ? e.personal.occupation
                    : "None"}
                </div>
                <div className="text-center text-orange-900 text-sm">
                  {e.personal.clan && Array.isArray(e.personal.clan)
                    ? e.personal.clan.slice(0, 2).join(", ")
                    : e.personal.clan && !Array.isArray(e.personal.clan)
                    ? e.personal.clan
                    : "None"}
                </div>
                <div className="text-center text-orange-900 text-sm">
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
