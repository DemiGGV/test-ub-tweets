import {
  Button,
  ButtonList,
  TripletLeft,
  TripletRight,
} from './PagginationList.styled.jsx';

export const PagginationList = ({
  currentPage,
  lastPage,
  setCurrentPage
}) => {
  return (
    <ButtonList>
      <Button
        onClick={() => setCurrentPage(prevPage => prevPage - 1)}
        disabled={currentPage === 1}
      >
        &lsaquo;
      </Button>
      {currentPage > 2 && (
        <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          1
        </Button>
      )}
      {currentPage > 3 && <TripletLeft>...</TripletLeft>}
      {currentPage >= 2 && (
        <Button onClick={() => setCurrentPage(currentPage - 1)}>
          {currentPage - 1}
        </Button>
      )}
      <Button $current onClick={() => setCurrentPage(currentPage)}>
        {currentPage}
      </Button>
      {currentPage <= lastPage - 1 && (
        <Button onClick={() => setCurrentPage(currentPage + 1)}>
          {currentPage + 1}
        </Button>
      )}
      {currentPage < lastPage - 2 && <TripletRight>...</TripletRight>}
      {currentPage < lastPage - 1 && (
        <Button
          onClick={() => setCurrentPage(lastPage)}
          disabled={currentPage === lastPage}
        >
          {lastPage}
        </Button>
      )}
      <Button
        onClick={() => setCurrentPage(prevPage => prevPage + 1)}
        disabled={currentPage === lastPage}
      >
        &rsaquo;
      </Button>
    </ButtonList>
  );
};
