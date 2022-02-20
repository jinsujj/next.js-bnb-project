import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { useDispatch } from "react-redux";
import { getRoomAPI } from "../../lib/api/room";
import { roomActions } from "../../store/room";
import { RoomType } from "../../types/room";


interface IProps {
    detailRoom: RoomType,
}

const roomDetail: NextPage<IProps> = ({detailRoom}) =>{
    const dispatch = useDispatch();
    dispatch(roomActions.setDetailRoom(detailRoom));
    
    return <div/>;
};


export const getServerSideProps :GetServerSideProps = async (context: GetServerSidePropsContext) =>{
    const {id} = context.query;

    try{
        if(id){
            const {data: detailRoom} = await getRoomAPI(Number(id as string));
            return {
                props:{
                    detailRoom,
                }
            }
        }
    }
    catch (e){
        console.log(e);
    }
    return null;
}