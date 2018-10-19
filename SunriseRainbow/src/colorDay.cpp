//
//  colorDay.cpp
//  SunriseRainbow
//
//  Created by cafe on 19/10/2018.
//

#include "colorDay.hpp"

void colorDay::addCols(vector<ofColor> _cols) {
    cols.push_back(_cols);
    for(int i = 0; i < _cols.size()-1; i++) {
        mesh.addVertex(ofVec3f(x, y, 0));
        mesh.addColor(_cols[i]);
        y += size;
    }
    y = 0;
    x += size;
}

void colorDay::addImage(string imgPath, float rescaleFactor) {
    imgPaths.push_back(imgPath);
    ofImage* newImg = new ofImage();
    newImg->load(imgPath);
    newImg->resize(newImg->getWidth() * rescaleFactor, newImg->getHeight() * rescaleFactor);
    imgs.push_back(newImg);
}

void colorDay::update() {
    imgIndex++;
    if(imgs.size() > 0)
        imgIndex %= imgs.size();
    else {
        imgIndex = 0;
    }
}

void colorDay::draw(float _x, float _y, float _z) {
    ofPushMatrix();
    ofTranslate(_x, _y, _z);
    if(imgs.size() > 0) {
        imgs[imgIndex]->draw(0, 0);
    }
    //mesh.draw();
    ofPopMatrix();
}
