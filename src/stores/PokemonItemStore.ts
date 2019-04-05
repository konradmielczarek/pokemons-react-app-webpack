import axios from 'axios';

import { action, observable } from 'mobx';

import { IPokemon } from '../types/pokemon';

export interface IPokemonItemStore {
  pokemonId: number;
  pokemonData: IPokemon;
  isError: boolean;
  isLoading: boolean;

  getPokemon: (id: number) => void;
  setPokemonId: (id: number) => void;
}

export class PokemonItemStore implements IPokemonItemStore {
  @observable pokemonId: number = 0;
  @observable pokemonData = {} as IPokemon;
  @observable isError: boolean = false;
  @observable isLoading: boolean = false;

  @action getPokemon = async (id: number) => {
    this.isLoading = true;

    try {
      const result = await axios.get(`${process.env.API_URL}/pokemon/${id}`);

      if (result.status === 200) {
        this.pokemonData = result.data;
        this.isError = false;
        setTimeout(() => this.isLoading = false, 600);
      }
    } catch (error) {
      console.error(error); // tslint:disable-line no-console
      this.isError = true;
    }
  }

  @action setPokemonId = (id: number) => {
    this.pokemonId = id;

    this.getPokemon(this.pokemonId);
  }
}
