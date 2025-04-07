
export const RenderImage = (image: { content: any; name: string | undefined }) =>  <img src={ `data:image/png;base64,${image.content}` } alt = { image.name } />
