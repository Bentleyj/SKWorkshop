#pragma once

#include "ofMain.h"
#include "ofxGui.h"
#include "spectrumFinder.hpp"
#include "ofxNestedFileLoader.h"
#include "colorDay.hpp"

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
    colorDay* currentDay;

    ofImage img;
    
    ofxPanel gui;
    
    spectrumFinder f;
    
    vector<string> imagePaths;
    
    ofBoxPrimitive box;
    
    ofFbo buffer;
    
    ofVec2f colorPos;

    bool playing = true;

    bool showGui;
    int imageIndex;
};
