import React, { useState } from 'react'
import { FaGithub, FaPlus } from 'react-icons/fa'

import { Container, Form, SubmitButton } from './styles'

export default function Main(){

    const [newRepo, setNewRepo] = useState('');

    function handleInputChange(e){
        setNewRepo(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <Container>
        
            <h1>
                <FaGithub size={25} />
                Meus Repositórios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder='Adicionar repositórios' value={newRepo} onChange={handleInputChange}/>
                <SubmitButton>
                    <FaPlus color="white" size={14} />
                </SubmitButton>
            </Form>
        
        </Container>
    )
}