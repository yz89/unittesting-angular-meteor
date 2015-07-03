describe('MessageCtrl', function () {
    beforeEach(module('app'));

    /*
     * Get a new controller before each test is executed
     */
    var $controller = {}, messages = {}, $scope = {};
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    /*
     * Messages will be used to make mocking of the actual Messages easier
     */
    beforeEach(function () {
        messages = {
            getCollection: function () {
                return [];
            },
            insert: function () {

            }
        };
    });

    it('should have messages', function () {
        var expected = [{_id: 1, text: 'my message'}];
        spyOn(messages, 'getCollection').and.returnValue(expected);
        $controller('MessageCtrl', {
            $scope: $scope,
            messages: messages
        });
        expect($scope.messages).toBe(expected);
    });

    it('should be able to insert a message', function () {
        spyOn(messages, 'insert');
        $controller('MessageCtrl', {
            $scope: $scope,
            messages: messages
        });
        $scope.insert();
        expect(messages.insert).toHaveBeenCalledWith($scope.text);
    });
});

describe('messages', function () {
    var messages, $meteor, $scope = {};
    beforeEach(module('app'));
    beforeEach(inject(function ($injector) {
        messages = $injector.get('messages');
        $meteor = $injector.get('$meteor');
    }));

    describe('getCollection', function() {
        it('should use Messages', function() {
            expect(messages.getCollection().$$collection).toEqual(Messages);
        });
    });

    describe('insert', function() {
        it('should call insertMessage', function() {
            var text = 'my message!';
            spyOn($meteor, 'call');
            messages.insert(text);
            expect($meteor.call).toHaveBeenCalledWith('insertMessage', text);
        });
    });
});