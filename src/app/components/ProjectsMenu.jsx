import { ScrollView, LayoutAnimation, UIManager } from 'react-native';
import { Expandable } from './Expandable';
import { useState, useEffect } from 'react';
import foldersGateway from '../gateways/foldersGateway';
import {Box} from "native-base";
import { useDrawerStatus } from '@react-navigation/drawer';

export const ProjectsMenu = (props) => {
    const [listDataSource, setListDataSource] = useState(CONTENT);
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const isDrawerOpen = useDrawerStatus();

    useEffect(() => {
        const fetchData = async () => {
            var response = await foldersGateway.GetFolders();
            if (response) {
                var transformedObject = response.data?.map(obj => ({
                    isExpanded: false,
                    category_name: obj.title,
                    color: obj.color,
                    id: obj.id,
                    subcategory: obj.projects?.map(project => ({
                        id: project.id,
                        val: project.title,
                        color: project.color
                    }))
                }));
                setListDataSource(transformedObject);
            }

        };
        fetchData();
    }, [isDrawerOpen]);

    return (
        <Box height="50%">
            <ScrollView>
                {listDataSource.map((item, key) => (
                    <Expandable
                        key={key}
                        item={item}
                    />
                ))}
            </ScrollView>
        </Box>
    );
}

const CONTENT = [
    {
        isExpanded: false,
        category_name: 'Math',
        subcategory: [
            { id: 1, val: 'Algebra' },
            { id: 3, val: 'Geometry' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'History',
        subcategory: [
            { id: 4, val: 'First World War' },
            { id: 5, val: 'Second World War' },
        ],
    },
];