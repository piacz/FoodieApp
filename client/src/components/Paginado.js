import React from 'react';

const Paginado = ({postsPerPage, totalPosts, paginate, filteredPosts}) => {
    const pageNumbers = [];
    const filtradas = [];
    
    if(filteredPosts.length!==0){
        for(let i=1; i<=Math.ceil(filteredPosts / postsPerPage); i++){
            filtradas.push(i);
        }
    }else{
        for(let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++){
            filtradas.push(i);
        }
    }
    

    
    return(
        <nav>
            <ul>
                {!filtradas.length &&
                    pageNumbers.map(number => (
                        <li key={number}> 
                            <a onClick={() => paginate(number)} >{number}</a>
                        </li>
                    ))     
                }
                {filtradas.length &&
                    filtradas.map(number => (
                        <li key={number}> 
                            <a onClick={() => paginate(number)} >{number}</a>
                        </li>
                    ))  
                }
            </ul>

        </nav>
    )
}
export default Paginado;