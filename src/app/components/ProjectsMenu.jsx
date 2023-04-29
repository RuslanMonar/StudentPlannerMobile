import { ScrollView, LayoutAnimation, UIManager } from 'react-native';
import { Expandable } from './Expandable';
import { useState } from 'react';

export const ProjectsMenu = () => {
    const [listDataSource, setListDataSource] = useState(CONTENT);
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    
    return (
        <ScrollView>
            {listDataSource.map((item, key) => (
                <Expandable
                    key={key}
                    item={item}
                />
            ))}
        </ScrollView>
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