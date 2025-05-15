declare module 'cloudinary-react' {
  import { Component } from 'react';

  export interface CloudinaryContextProps {
    cloudName: string;
    children: React.ReactNode;
  }

  export class CloudinaryContext extends Component<CloudinaryContextProps> {}
} 