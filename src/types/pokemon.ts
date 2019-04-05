import { TypeBadge } from './typeBadge';

type Evolution = {
  num: string,
  name: string,
};

export interface IPokemon {
  id: number;
  num: string;
  name: string;
  img: string;
  type: TypeBadge[];
  height: string;
  weight: string;
  candy: string;
  candy_count: number;
  egg: string;
  spawn_chance: number;
  avg_spawns: number;
  spawn_time: string;
  multipliers: number[];
  weaknesses: TypeBadge[];
  prev_evolution: Evolution[];
  next_evolution: Evolution[];
}
