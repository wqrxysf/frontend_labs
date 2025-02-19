export type Presentation = {
  title: string;
  slideCollection: SlideCollection;
};

export type SlideCollection = {
  slides: SlideType[];
};

export type SlideType = {
  id: string;
  background: Background;
  contents: Content[];
};

export type Content = SlideText | SlideImage;

export type Select = Content["contentId"] | SlideType["id"];

export type SlideText = Position &
  Size & {
    type: "text";
    field: string;
    fontSize: number;
    fontFamily: string;
    contentId: string;
  };

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type SlideImage = Position &
  Size & {
    type: "image";
    src: string;
    contentId: string;
  };

export type BackgroundImage = {
  src: string;
  type: "image";
};

export type BackgroundSolid = {
  color: string;
  type: "solid";
};

export type Background = BackgroundSolid | BackgroundImage;

// export function createPresentation(title: string, slides: SlideType[] = []): Presentation {
//     return {
//         title,
//         slideCollection: {
//             slides,
//         },
//     };
// }

// export function createSlide(id: string, background: Background, contents: Content[] = []): SlideType {
//     return {
//         id,
//         background,
//         contents,
//     };
// }

// export function renamePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
//     return {
//         ...presentation,
//         title: newTitle,
//     }
// }

// export function addSlide(presentation: Presentation, newSlide: SlideType): Presentation {
//     return {
//         ...presentation,
//         slideCollection: {
//             slides: [...presentation.slideCollection.slides, newSlide]
//         }
//     }
// }

// export function removeSlide(presentation: Presentation, id: string): Presentation {
//     return {
//         ...presentation,
//          slideCollection: {
//             slides: [...presentation.slideCollection.slides.filter(slide => slide.id !== id)]
//         }
//     }
// }

// export function changeSlidePosition(presentation: Presentation, id: string, newIndex: number): Presentation {
//     const slides = [...presentation.slideCollection.slides]
//     const index = slides.findIndex(slide => slide.id === id)
//     if (index > -1) {
//         const [slide] = slides.splice(index, 1)
//         slides.splice(newIndex, 0, slide)
//     }
//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         }
//      }
// }

// export function addContentToSlide(presentation: Presentation, slideId: string, content: Content): Presentation {
//     const slides = presentation.slideCollection.slides.map(slide =>
//         slide.id === slideId ? { ...slide, contents: [...slide.contents, content] } : slide
//     )

//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         }
//     }
// }

// export function removeContentFromSlide(presentation: Presentation, slideId: string, contentId: string): Presentation {
//     const slides = presentation.slideCollection.slides.map(slide =>
//         slide.id === slideId ? { ...slide, contents: slide.contents.filter(content => content.contentId !== contentId) } : slide
//     )

//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         }
//     }
// }

// export function changeContentPosition(presentation: Presentation, slideId: string, contentId: string, newPos: Position): Presentation {
//     const slides = presentation.slideCollection.slides.map(slide => {
//         if (slide.id === slideId) {
//             return {
//                 ...slide,
//                 contents: slide.contents.map(content =>
//                     content.contentId === contentId ? { ...content, pos: newPos } : content
//                 )
//             };
//         }
//         return slide
//     })

//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         },
//     }
// }

// export function changeContentSize(presentation: Presentation, slideId: string, contentId: string, newSize: Size): Presentation {
//     const slides = presentation.slideCollection.slides.map(slide => {
//         if (slide.id === slideId) {
//             return {
//                 ...slide,
//                 contents: slide.contents.map(content =>
//                     content.contentId === contentId ? { ...content, size: newSize } : content
//                 )
//             }
//         }
//         return slide
//     })

//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         }
//     }
// }

// export function changeTextContent(presentation: Presentation, slideId: string, textId: string, newContent: string): Presentation {
//     const slides = presentation.slideCollection.slides.map(slide => {
//         if (slide.id === slideId) {
//             return {
//                 ...slide,
//                 texts: slide.contents.map(text =>
//                     text.contentId === textId ? { ...text, content: newContent } : text
//                 )
//             }
//         }
//         return slide
//     });

//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         }
//     }
// }

// export function changeTextFontFamily(presentation: Presentation, slideId: string, textId: string, newFontFamily: string): Presentation {
//     const slides = presentation.slideCollection.slides.map(slide => {
//         if (slide.id === slideId) {
//             return {
//                 ...slide,
//                 texts: slide.contents.map(text =>
//                     text.contentId === textId ? { ...text, fontFamily: newFontFamily } : text
//                 )
//             };
//         }
//         return slide
//     })

//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         }
//     }
// }

// export function changeTextFontSize(presentation: Presentation, slideId: string, textId: string, newFontSize: number): Presentation {
//     const slides = presentation.slideCollection.slides.map(slide => {
//         if (slide.id === slideId) {
//             return {
//                 ...slide,
//                 texts: slide.contents.map(text =>
//                     text.contentId === textId ? { ...text, fontSize: newFontSize } : text
//                 )
//             }
//         }
//         return slide
//     })

//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         }
//     }
// }

// export function changeSlideBackground(presentation: Presentation, slideId: string, newBackground: BackgroundSolid | BackgroundImage): Presentation {
//     const slides = presentation.slideCollection.slides.map(slide =>
//         slide.id === slideId ? { ...slide, background: newBackground } : slide
//     )

//     return {
//         ...presentation,
//         slideCollection: {
//             slides,
//         }
//     }
// }
