# <img width="30" height="1440" alt="kakashi" src="https://github.com/user-attachments/assets/030727c4-1838-450f-8f6f-f070617a9f49" /> Narutodle Infinite 

<img width="300" height="1440" alt="transparent_logo" src="https://github.com/user-attachments/assets/755f1f32-9ab6-4e0d-ab20-248b96b8e73a"/>
<img width="600" height="774" alt="Screenshot 2026-01-07 173914" src="https://github.com/user-attachments/assets/fa8806f9-0764-41c9-99fd-53b63aa854f4" style="border-radius: 4"/>

![Static Badge](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js)
![Static Badge](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Static Badge](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white)
![Static Badge](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![Static Badge](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white)

### Description
Narutodle Infinite is an unlimited version of the web based "Naruto" character guessing game Narutodle with rogue-like elements such as health, score and shinobi ranks. The game contains 107 characters from the series "Naruto" and "Boruto", the character to guess is selected randomly from that collection and the player must find it using the colored clues from their previous guessed characters. The character collection is fetched from an externel api called "Dattebayo API", the documentation of the api can be found <a href="https://api-dattebayo.vercel.app/docs">here</a>. 

### Why should you play it?
<strong>Not just Guessing</strong>. The main reason of the rogue-like features is to encourage the player to keep playing after certain rounds to unlock the next shinobi ranks and bump up that score to achieve that. If you have the knowledge to climb up to the highest shinobi rank, you have to keep guessing. I wanted players to have a reason to keep playing which was an element that was missing from the original daily version since you can only guess one selected character. 

#### Health
Thus, my version was implemented with limited resources such as the health to prevent the player to just blindly guessing. Each guess has a benefit and a drawback in the form of losing health on totally wrong fields and gaining health on perfect guesses and the partial guesses are unpunished.

<img width="244" height="98" alt="Screenshot 2026-01-07 180041" src="https://github.com/user-attachments/assets/42c28934-d4f8-4f28-b460-0a8e248ada08" />

#### Score + Shinobi rank
Added a score board and in tandem with interesting shinobi rank badges which keeps the player's interest and give them a goal to hit rather than just "Guessing". Each completed rounds reward a single score and each score has its corresponding shinobi rank badge.

<img width="200" height="97" alt="Screenshot 2026-01-07 175951" src="https://github.com/user-attachments/assets/39b45cbd-6b71-4dab-b902-312121fd6068" />
<img width="450" height="105" alt="Screenshot 2026-01-07 175918" src="https://github.com/user-attachments/assets/c65427dd-7fc4-433c-850e-c82ffbfdb905" />

<img width="200" height="94" alt="Screenshot 2026-01-07 180029" src="https://github.com/user-attachments/assets/42254f1b-11e9-492c-a243-c680aee38935" />
<img width="450" height="99" alt="Screenshot 2026-01-07 180022" src="https://github.com/user-attachments/assets/64530307-cb21-4444-b019-6211c1578dc2" />

#### Hints
To aid the player to conserve their health, 3 types of hints are implemented that unlocks after certain number of guesses to maintain the difficulty while helping the player. Each contains information about the character to be guessed ranging from general to a specific hint.

<img width="500" height="264" alt="Screenshot 2026-01-07 180543" src="https://github.com/user-attachments/assets/cdc63934-2771-4f6f-a8b6-92788947d703" />
<img width="500" height="330" alt="Screenshot 2026-01-07 180103" src="https://github.com/user-attachments/assets/3f6d3c93-425f-4194-8c4f-bd5706d91f84" />

### Deployment
The current version of the game is hosted with vercel and is implemented with Next.js framework which integrates tightly with Vercel. The webgame link can be found on the right hand side of the repository or you can access it <a href="https://narutodleinfinite.vercel.app/">here</a>.

### Future update plans
The following additional modes / features are in the works:
 - Jutsu caster guessing mode
 - Background music
 - Score tracking with leaderboard
 - Nature type images rather than text
   



