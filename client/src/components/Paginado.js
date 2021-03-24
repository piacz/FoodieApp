import React from 'react';

const Paginado = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    // const filtradas = [];
    //si hay filtradas
    // if(filteredPosts[0]){
    //     for(let i=1; i<=Math.ceil(filteredPosts / postsPerPage); i++){
    //         filtradas.push(i);
    //     }
    // }else{//si no hay filtradas
        for(let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++){
            pageNumbers.push(i);
        }
    // }
    

    
    return(
        <nav>
            <ul>
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number}> 
                            <a onClick={() => paginate(number)} >{number}</a>
                        </li>
                    ))
                }     
              
            </ul>

        </nav>
    )
}
  {/* {
                (filtradas[0]) &&
                    filtradas.map(number => (
                        <li key={number}> 
                            <a onClick={() => paginate(number)} >{number}</a>
                        </li>
                    ))  
                } */}
export default Paginado;