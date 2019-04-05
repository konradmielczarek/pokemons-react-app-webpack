import axios from 'axios';

import { action, observable } from 'mobx';

import { IPokemon } from '../types/pokemon';

export interface IAppStore {
  pokemons: IPokemon[];
  totalCount: number;

  isError: boolean;
  isLoading: boolean;

  searchText: string;
  orderBy: string;

  currentPage: number;
  limit: number;

  getPokemons(limit: number, page: number, searchTxt?: string, orderBy?: string): void;
  setCurrentPage(page: number): void;
  setSearchText(text: string): void;
  setIsLoading(isLoading: boolean): void;
  setOrderBy(opiton: string): void;
}

export class AppStore implements IAppStore {
  @observable pokemons: IPokemon[] = [];
  @observable totalCount: number = 0;

  @observable isError: boolean = false;
  @observable isLoading: boolean = true;

  @observable searchText: string = '';
  @observable orderBy: string = 'num';

  @observable currentPage: number = 1;
  @observable limit: number = 20;

  getPokemons = async (limit: number, page: number = 1, searchTxt: string = '', orderBy: string = '') => {
    try {
      const result = await axios.get(
        `${process.env.API_URL}/pokemon?_page=${page}&_limit=${limit}&name_like=${searchTxt}&_sort=${orderBy}&_order=asc`
      );

      this.pokemons = result.data;
      this.totalCount = parseInt(result.headers['x-total-count'], 10);
      this.isLoading = false;
      this.isError = false;
    } catch (error) {
      console.error(error); // tslint:disable-line no-console
      this.isError = true;
    }
  }

  @action setCurrentPage = (page: number) => {
    this.currentPage = page;

    this.getPokemons(this.limit, page, this.searchText, this.orderBy);
  }

  @action setSearchText = (text: string) => {
    this.searchText = text;
    this.currentPage = 1;

    this.getPokemons(this.limit, 1, this.searchText, this.orderBy);
  }

  @action setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  }

  @action setOrderBy = (option: string) => {
    this.orderBy = option;

    this.getPokemons(this.limit, this.currentPage, this.searchText, this.orderBy);
  }

  // reaction = reaction(
  //   () => this.searchText,
  //   text => {
  //     this.getPokemons(this.limit, 1, text, this.orderBy);
  //     console.log(text);
  //   }
  // );
}
