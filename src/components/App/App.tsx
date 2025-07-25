
import css from "./App.module.css"
import { useState } from "react";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from "../../services/noteService";
import { useDebouncedCallback } from 'use-debounce';


/*components*/
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination"
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";




export default function App() {
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [debSearch, setDebouncedSearch] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false)

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', debSearch, page],
	  queryFn: () => fetchNotes({ search: debSearch, page, perPage: 12 }),
    placeholderData: keepPreviousData,
  });


const handleSearch = (search: string) => {
    setSearch(search);
	setPage(1);
	handleDebouncedSearch(search);
      
	};
const handleDebouncedSearch = useDebouncedCallback((search: string) => { setDebouncedSearch(search) }, 400)




    return (<div className={css.app}>
	<header className={css.toolbar}>
			<SearchBox value={search} onSearch = {handleSearch} />
		{data && data.total_pages > 1 && (
          <Pagination
            selectedPage={page}
            totalPages={data.total_pages}
            onPageChange={setPage}
          />
        )}
		 <button className={css.button} type='button' onClick={() => setModalIsOpen(true)}>Create +</button>
		</header>
		

		
         {isLoading &&  <Loader/>}
       {isError &&  <ErrorMessage/>}

		 {isSuccess && data?.notes?.length > 0 && (
        <NoteList notes={data.notes} />)
      }
      
      {isSuccess && data?.notes?.length === 0 && (
  <p>No notes found</p>
)}
		

		{modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)}>
          <NoteForm onClose={()=> {setModalIsOpen(false)} } />
        </Modal>
      )}
        
</div>
)
}