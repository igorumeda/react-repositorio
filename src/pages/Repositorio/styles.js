import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Loading = styled.div`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    padding: 30px;
    margin: 80px auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0d2636;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: black;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`;

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;

        & + li{
            margin-top: 12px;
        }

        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #0d2636;
        }

        div{
            flex: 1;
            margin-left: 12px;

            a{
                margin-right: 10px;
            }

            p{
                margin-top: 10px;
                font-size: 12px;
                color: gray;

                span{
                    color: white;
                    padding: 4px 7px;
                    margin-left: 10px;
                    border-radius: 4px;
                    font-size: 10px;
                    background: transparent;
                    border: 1px solid #eee;
                }
                
                span.open{
                    color: green;
                    border-color: green;
                }

                span.closed{
                    color: red;
                    border-color: red;
                }
            }
        }

        strong{
            font-size: 15px;

            a{
                text-decoration: none;
                color: #222;
                transform: 0.2s;

                &:hover{
                    color: #0071db;
                }
            }

            span{
                background-color: #222;
                color: white;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                padding: 4px 7px;
                margin-right: 10px;
                display: inline-block;
            }
        }

    }
`;

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    margin-top: 10px;
    border-top: 1px solid #eee;

    button{
        outline: 0;
        border: 0;
        background-color: black;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;

        &:hover{
            opacity: 0.8;
        }

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;

export const StateFilters = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;

    span{
        font-weight: bold;
        margin-right: 10px;
    }

    button{
        outline: 0;
        border: 0;
        border-radius: 5px;
        margin-right: 10px;
        padding: 4px 7px;
        background-color: black;
        color: white;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;