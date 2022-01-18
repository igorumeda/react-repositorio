import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, StateFilters } from './styles'
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../services/api'
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function Repositorio(){

    const [loading, setLoading] = useState(true);

    const { repositorio: nomeRepo } = useParams();

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('all');

    useEffect(()=>{

        async function load(){

            const [repositorioData, repositorioIssues] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: 'all',
                        per_page: 5
                    }
                })
            ])

            setRepositorio(repositorioData.data);
            setIssues(repositorioIssues.data);
            setLoading(false);

        }

        load();

    },[nomeRepo])

    useEffect(()=>{

        async function loadIssue(){

            const response = await api.get(`/repos/${nomeRepo}/issues`, {
                params: {
                    state: filter,
                    page: page,
                    per_page: 5
                }
            })

            setIssues(response.data);

        }

        loadIssue();

    },[page, nomeRepo, filter])

    function handlePage(action){
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    if(loading){
        return(
            <Loading>
                Carregando...
            </Loading>
        )
    }

    return(
        <Container>

            <BackButton to="/">
                <FaArrowLeft color="black" size={30} />
            </BackButton>
            
            <Owner>
                <img src={ repositorio.owner.avatar_url } alt={repositorio.owner.login} />
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            <IssuesList>

                <StateFilters>
                    <span>Listar: </span>
                    <button onClick={(e)=>{ setFilter('all') }} disabled={filter === 'all'}>Todos</button>
                    <button onClick={(e)=>{ setFilter('open') }} disabled={filter === 'open'}>Abertos</button>
                    <button onClick={(e)=>{ setFilter('closed') }} disabled={filter === 'closed'}>Fechados</button>
                </StateFilters>

                {issues.map(issue => (

                    <li key={String(issue.id)}>

                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        <div>
                            <strong>
                                <a href={issue.html_url} target="blank" >{issue.title}</a>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>

                            <p>
                            by {issue.user.login}
                            {issue.state === 'open' && <span className="open">Aberto</span>}
                            {issue.state === 'closed' && <span className="closed">Fechado</span>}
                            </p>
                        </div>

                    </li>

                ))}

            </IssuesList>

            <PageActions>
                <button onClick={()=> handlePage('back') } disabled={ page<2 }>Voltar</button>
                <button onClick={()=> handlePage('next')}>Proximo</button>
            </PageActions>

        </Container>
    )

}