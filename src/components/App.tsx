import React, { Component } from 'react';

// COMPONENTS
import ActionBar from './ActionBar/ActionBar';
import Error from './Error/Error';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import Navbar from './Navbar/Navbar';
import Pagination from './Pagination/Pagination';
import PokemonsList from './PokemonsList/PokemonsList';

// REACTSTRAP
import { Container } from 'reactstrap';

// IMAGES
require('../assets/images/favicon.ico');

// MOBX
import { inject, observer } from 'mobx-react';

// TYPES
import { IAppStore } from '../stores/AppStore';

interface IProps {
  appStore?: IAppStore;
}

class App extends Component<IProps> {
  async componentDidMount() {
    const { appStore } = this.props;

    await appStore!.getPokemons(appStore!.limit, 1);
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { appStore } = this.props;
    const text: string = e.target.value;

    appStore!.setSearchText(text);
  }

  handlePageChange = (e: React.MouseEvent<HTMLElement>) => {
    const { appStore } = this.props;
    const page: number = parseInt(e.currentTarget.dataset.page!, 10);

    appStore!.setIsLoading(true);
    appStore!.setCurrentPage(page);
  }

  render() {
    const { isError, isLoading, totalCount, limit, currentPage } = this.props.appStore!;

    if (isError) {
      return (
        <Container className="mt-5">
          <Error />
        </Container>
      );
    }

    return (
      <>
        <Navbar handleSearchFn={this.handleSearch} />
        <Container className="mt-5">
          <ActionBar />
          {isLoading ? (
            <div className="main-spinner-wrapper">
              <LoadingSpinner />
            </div>
          ) : (
              <>
                {!totalCount ? (
                  <p>No results</p>
                ) : (
                    <PokemonsList />
                  )}
                {totalCount > 0 && (
                  <Pagination
                    totalCount={totalCount}
                    limit={limit}
                    currentPage={currentPage}
                    handleClickFn={this.handlePageChange}
                  />
                )}
              </>
            )}
        </Container>
      </>
    );
  }
}

export default inject('appStore')(observer(App));
