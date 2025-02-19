// import axios from 'axios';
// import { EditorType } from './EditorType';
// import { Content } from './PresentationType';

// const UNSPLASH_ACCESS_KEY = 'GSwnp31Da5r_WSJibVRm2rQ39mE8XHu9hoc8umfXWec'; // Замените YOUR_ACCESS_KEY на ваш реальный ключ

// function generateId(): string {
//     return Math.random().toString(36).substr(2, 9);
// }

// interface UnsplashImage {
//     id: string;
//     urls: {
//         regular: string;
//     };
// }

// function fetchUnsplashImage(query: string): Promise<string | null> {
//     return axios.get(`https://api.unsplash.com/photos/random`, {
//         params: {
//             query: query,
//             client_id: UNSPLASH_ACCESS_KEY,
//         },
//     })
//     .then(response => {
//         const image: UnsplashImage = response.data;
//         return image.urls.regular; // Возвращаем URL изображения
//     })
//     .catch(error => {
//         console.error('Ошибка при получении изображения:', error);
//         return null;
//     });
// }

// function addImageFromUnsplash(editor: EditorType, payload: { slideId: string, query: string }): Promise<EditorType> {
//     return fetchUnsplashImage(payload.query) // Получаем изображение по запросу
//     .then(imageUrl => {
//         if (!imageUrl) {
//             console.log('Не удалось получить изображение из Unsplash.');
//             return editor; // Возвращаем прежний редактор, если изображение не получено
//         }

//         const slideId = editor.selection.selectedSlideId;
//         const content: Content = {
//             contentId: generateId(),
//             type: 'image',
//             src: imageUrl,
//             width: 200,
//             height: 150,
//             x: Math.random() * 100 + 350,
//             y: Math.random() * 60 + 200,
//         };

//         const slides = editor.presentation.slideCollection.slides.map(slide =>
//             slide.id === slideId ? { ...slide, contents: [...slide.contents, content] } : slide
//         );

//         return {
//             ...editor,
//             presentation: {
//                 ...editor.presentation,
//                 slideCollection: {
//                     slides,
//                 }
//             },
//             selection: {
//                 ...editor.selection,
//                 selectedContentId: content.contentId,
//             },
//         };
//     });
// }

// export {
//     addImageFromUnsplash,
// };

import axios from 'axios';
import { EditorType } from './EditorType';
import { Content } from './PresentationType';

const UNSPLASH_ACCESS_KEY = 'GSwnp31Da5r_WSJibVRm2rQ39mE8XHu9hoc8umfXWec'; // Замените YOUR_ACCESS_KEY на ваш реальный ключ

function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

interface UnsplashImage {
    id: string;
    urls: {
        regular: string;
    };
}

async function fetchUnsplashImage(query: string): Promise<string | null> {
    try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                query: query,
                client_id: UNSPLASH_ACCESS_KEY,
            },
        });
        const image: UnsplashImage = response.data;
        console.log(image.urls.regular)
        return image.urls.regular; // Возвращаем URL изображения
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
        return null;
    }
}

async function addImageFromUnsplash(editor: EditorType, payload: { slideId: string; query: string }): Promise<EditorType> {
    const imageUrl = await fetchUnsplashImage(payload.query); // Получаем изображение по запросу
    if (!imageUrl) {
        console.log('Не удалось получить изображение из Unsplash.');
        return editor; // Возвращаем прежний редактор, если изображение не получено
    }

    const slideId = editor.selection.selectedSlideId;
    const content: Content = {
        contentId: generateId(),
        type: 'image',
        src: imageUrl,
        width: 200,
        height: 150,
        x: Math.random() * 100 + 350,
        y: Math.random() * 60 + 200,
    };

    const slides = editor.presentation.slideCollection.slides.map(slide =>
        slide.id === slideId ? { ...slide, contents: [...slide.contents, content] } : slide
    );

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slideCollection: {
                slides,
            }
        },
        selection: {
            ...editor.selection,
            selectedContentId: content.contentId,
        },
    };
}

export {
    addImageFromUnsplash,
};