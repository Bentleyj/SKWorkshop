//
//  colorDay.hpp
//  SunriseRainbow
//
//  Created by cafe on 19/10/2018.
//

#ifndef colorDay_hpp
#define colorDay_hpp

#include "ofMain.h"

class colorDay {
public:
    vector<vector<ofColor>> cols;
    vector<ofImage*> imgs;
    vector<string> imgPaths;
    ofColor averageColor;
    int imgIndex = 0;
    ofImage img;
    ofMesh mesh;
    float size = 2;
    float x = 0;
    float y = 0;
    
    colorDay() {
        mesh.setMode(OF_PRIMITIVE_POINTS);
        imgs.resize(0);
    }
    
    void addImage(string imgPath, float rescaleFactor);
    void addCols(vector<ofColor> cols);
    void draw(float _x, float _y, float _z);
    void update();
};

#endif /* colorDay_hpp */
