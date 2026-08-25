// Passphrase word pool — short, concrete, easy-to-type words. Deduped at load.
const RAW = `
acorn alpine amber anchor anvil apron arrow aspen atlas autumn avocado badger bagel bamboo banjo barley
basil beacon beaver birch bison blanket blossom bobcat bonfire boulder bramble brass breeze brick bridge bronze
brook bucket buffalo bugle bungalow burrow butter cabin cactus camel candle canoe canyon caramel caravan carbon
cardinal cargo carrot cascade castle catfish cattle cedar cello chalk cherry chestnut chimney cinder cinnamon citrus
clay cliff clover cobalt cobbler cocoa coconut comet compass copper coral cotton cougar cove coyote crater
crayon creek cricket crimson crocus crumpet crystal cypress daisy dandelion dapple dew diesel dingo dolphin domino
donkey drift drizzle drum dune dusk eagle earthen ebony echo eclipse eel elk ember emerald engine
falcon fawn feather fern ferret fiddle fig finch fjord flannel flint fog forest fossil fox foxglove
freckle frost gale garnet gazebo gecko geyser ginger glacier glade goose gopher gourd granite grotto grove
gull gumbo gust hammock harbor harvest hazel heron hickory hillside hollow honey hoof horizon hornet husk
iceberg icicle indigo inkwell iris island ivy jackal jade jasmine jasper jigsaw juniper kayak kelp kettle
kiwi knapsack lagoon lantern lark lava lavender ledge lemon lentil lichen lilac lily limestone linen lizard
llama locket locust log loon lotus lumber lynx mango mantis maple marble marigold marsh meadow melon
mesa mineral mink minnow mint mirror mist mocha molasses monsoon moose moss moth mulberry mule mustang
nectar nest nettle newt nickel nimbus nomad nook nutmeg oak oasis oat obsidian ocelot octopus onyx
opal orchard orchid oregano osprey otter owl oxcart oyster paddle pagoda palm panther paprika papyrus parka
parsley pasture peach peacock pebble pecan pelican peony pepper perch pheasant pickle pigeon pinecone pistachio plateau
plum pollen pond poplar poppy porridge prairie pretzel primrose puffin pumpkin quail quarry quartz quill quilt
raccoon rain raspberry raven ravine reed reef ridge ripple riverbed robin rooster rosemary rowboat ruby rye
saddle saffron sage saguaro salmon sandbar sapling sardine satchel scallop seagrass seashell sequoia shale shepherd shore
shrub sierra silo silver sketch skillet sled sleet slope snail snapper snowdrift sorrel sparrow spearmint spindle
spruce squash squirrel starling steppe stork stove stream summit sundial sunflower swan sycamore taffy talon tapioca
teal thicket thistle thorn thrush thunder timber toad toffee topaz torrent toucan trellis trout truffle tugboat
tulip tundra turnip turtle twig umber urchin valley vanilla velvet vine violet volcano wagon walnut walrus
wasp waterfall wheat willow wind wolf wombat woodland wren yarrow yew yonder zephyr zinnia zucchini
`;
export const WORDS = [...new Set(RAW.trim().split(/\s+/))];
