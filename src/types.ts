/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Game {
  id: string;
  title: string;
  genre?: string;
  Ganre?: string;
  prototypeWeek: number;
  shortDescription: string;
  backgroundImage?: string;
  playUrl: string;
  itchUrl: string;
  releaseDate: string; // ISO date string used to check release state
  rateFormUrl?: string; // Opt-in custom Google Rate Form URL
}

export interface AboutSection {
  title: string;
  text: string;
}

export interface GamesData {
  games: Game[];
  aboutSection: AboutSection;
}
