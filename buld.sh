
#
# BUILD DOCS
#
#!bin/sh
echo '@import "variables.less";@import "mixins.less";' > less/varmix.less

cat less/varmix.less less/accordion.less > less/accordion.tmp.less
./node_modules/.bin/lessc less/accordion.tmp.less > css/accordion.css

cat less/varmix.less less/carousel.less > less/carousel.tmp.less
./node_modules/.bin/lessc less/carousel.tmp.less > css/carousel.css

cat less/varmix.less less/dropdowns.less > less/dropdowns.tmp.less
./node_modules/.bin/lessc less/dropdowns.tmp.less > css/dropdowns.css

cat less/varmix.less less/modals.less > less/modals.tmp.less
./node_modules/.bin/lessc less/modals.tmp.less > css/modals.css

cat less/varmix.less less/tooltip.less > less/tooltip.tmp.less
./node_modules/.bin/lessc less/tooltip.tmp.less > css/tooltip.css

cat less/varmix.less less/navs.less > less/navs.tmp.less
./node_modules/.bin/lessc less/navs.tmp.less > css/navs.css


rm less/*.tmp*

./node_modules/.bin/jshint js/* --config js/.jshintrc

echo "********** JS and CSS Built"