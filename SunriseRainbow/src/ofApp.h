#pragma once

#include "ofMain.h"
#include "ofxGui.h"
#include "spectrumFinder.hpp"
#include "ofxNestedFileLoader.h"

struct colorDay {
    vector<vector<ofColor>> cols;
    vector<string> imgPaths;
    ofBoxPrimitive* box;
    float size = 10;
    
    void draw(float _x, float _y, float _z) {
        float x = _x;
        float y = _y;
        float z = _z;
        for(int i = 0; i < cols.size(); i++) {
            for(int j = 0; j < cols[i].size(); j++) {
                ofSetColor(cols[i][j]);
                ofPushMatrix();
                ofTranslate(x, y, z);
                box->draw();
                ofPopMatrix();
                y += size;
            }
            y = _y;
            x += size;
        }
    }
};

class ofApp : public ofBaseApp{
public:
    void setup();
    void update();
    void draw();

    void keyPressed(int key);
    void keyReleased(int key);
    void mouseMoved(int x, int y );
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    void mouseEntered(int x, int y);
    void mouseExited(int x, int y);
    void windowResized(int w, int h);
    void dragEvent(ofDragInfo dragInfo);
    void gotMessage(ofMessage msg);

    vector<colorDay*> colorDays;

    ofImage img;
    
    ofxPanel gui;
    
    spectrumFinder f;
    
    vector<string> imagePaths;
    
    ofBoxPrimitive box;
    
    ofFbo buffer;
    
    ofVec2f colorPos;
    
    ofEasyCam cam;

    bool showGui;
    int imageIndex;
};
