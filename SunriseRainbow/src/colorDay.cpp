//
//  colorDay.cpp
//  SunriseRainbow
//
//  Created by cafe on 19/10/2018.
//

#include "colorDay.hpp"

void colorDay::addCols(vector<ofColor> _cols) {
    cols.push_back(_cols);
    if(_cols.size() > 0) {
        for(int i = 0; i < _cols.size()-1; i++) {
            mesh.addVertex(ofVec3f(x, y, 0));
            mesh.addColor(_cols[i]);
            y += size;
        }
        y = 0;
        x += size;
    }
    
    if(cols.size() > 0) {
        int num = 0;
        float r = 0;
        float g = 0;
        float b = 0;
        for(int i = 0; i < cols.size(); i++) {
            for(int j = 0; j < cols[i].size(); j++) {
                r += cols[i][j].r;
                g += cols[i][j].g;
                b += cols[i][j].b;
                num++;
            }
        }
        r /= num;
        g /= num;
        b /= num;
        averageColor = ofColor(r, g, b);
    }
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
    ofSetColor(255);
    if(imgs.size() > 0) {
        imgs[imgIndex]->draw(0, 0);
        ofSetColor(averageColor);
//        ofDrawRectangle(-50, 0, 50, imgs[imgIndex]->getHeight());
//        ofTranslate(0, imgs[imgIndex]->getHeight());
    }

//    ofSetColor(255);
//    mesh.draw();
    ofPopMatrix();
}
