import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import { toast } from 'react-toastify'

import api from '../../services/api'

export default function Main(){

    const [loading, setLoading] = useState(false);

    const [newUser, setNewUser] = useState('');
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);

    useEffect(()=>{

        const repoStorage = localStorage.getItem('repos');
        if(repoStorage){
            setRepositorios(JSON.parse(repoStorage));
        }

    },[])

    useEffect(()=>{
        localStorage.setItem('repos', JSON.stringify(repositorios));
    },[repositorios])

    const handleSubmit = useCallback((e)=>{

        e.preventDefault();

        async function submit(){

            setLoading(true);

            try{

                if(newUser === '' || newRepo === ''){
                    toast.error('Preencha todos os campos');
                    return;
                }

                const hasRepo = repositorios.find(repo => repo.name === (`${newUser}/${newRepo}`));
                if(hasRepo){
                    toast.error('Respositório já adicionado');
                    return;
                }
        
                const response = await api.get(`repos/${newUser}/${newRepo}`);
        
                const data = {
                    name: response.data.full_name,
                }
        
                setRepositorios([...repositorios, data]);
                setNewUser('');
                setNewRepo('');

            }catch(error){

                console.log(error);
                toast.error('Erro na requisição, verifique se o repositório existe');
                
            }finally{
                setLoading(false);
            }
            
        }

        submit();

    },[newUser, newRepo, repositorios])

    const handleDelete = useCallback((repo)=>{
        
        const find = repositorios.filter(r => r.name !== repo); // Filtra apenas os resultados sem o repo

        setRepositorios(find);

    },[repositorios])

    return(
        <Container>
        
            <h1>
                <FaGithub size={25} />
                Meus Repositórios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder='Conta do GitHub' value={newUser} onChange={ (e)=>setNewUser(e.target.value) }/>
                <span>/</span>
                <input type="text" placeholder='Nome do repositório' value={newRepo} onChange={ (e)=>setNewRepo(e.target.value) }/>
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color="white" size={14} />
                    ) : (
                        <FaPlus color="white" size={14} />  
                    )}
                </SubmitButton>
            </Form>

            <List>

                {repositorios.map((repo, index) => (

                    <li key={index}>
                        <span>
                            <DeleteButton onClick={ ()=> handleDelete(repo.name) } >
                                <FaTrash size={14} />
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20} />
                        </Link>
                    </li>

                ))}

            </List>
        
        </Container>
    )
}