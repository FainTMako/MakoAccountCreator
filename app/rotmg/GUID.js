var counter = 0;


        function create()
        {
            var _local_1 = new Date();
            var _local_2 = _local_1.getTime();
            var _local_3 = (Math.random() * Number.MAX_VALUE);
            var _local_4 = 	"";
            return (calculate((((_local_2 + _local_4) + _local_3) + counter++)).toUpperCase());
        }

        function calculate(_arg_1)
        {
            return (hex_sha1(_arg_1));
        }

        function hex_sha1(_arg_1)
        {
            return (binb2hex(core_sha1(str2binb(_arg_1), (_arg_1.length * 8))));
        }

        function core_sha1(_arg_1,_arg_2)
        {
            var _local_10;
            var _local_11;
            var _local_12;
            var _local_13;
            var _local_14;
            var _local_15;
            var _local_16;
            _arg_1[(_arg_2 >> 5)] = (_arg_1[(_arg_2 >> 5)] | (128 << (24 - (_arg_2 % 32))));
            _arg_1[((((_arg_2 + 64) >> 9) << 4) + 15)] = _arg_2;
            var _local_3 = [80];
            var _local_4 = 1732584193;
            var _local_5 = -271733879;
            var _local_6 = -1732584194;
            var _local_7 = 271733878;
            var _local_8 = -1009589776;
            var _local_9 = 0;
            while (_local_9 < _arg_1.length)
            {
                _local_10 = _local_4;
                _local_11 = _local_5;
                _local_12 = _local_6;
                _local_13 = _local_7;
                _local_14 = _local_8;
                _local_15 = 0;
                while (_local_15 < 80)
                {
                    if (_local_15 < 16)
                    {
                        _local_3[_local_15] = _arg_1[(_local_9 + _local_15)];
                    }
                    else
                    {
                        _local_3[_local_15] = rol((((_local_3[(_local_15 - 3)] ^ _local_3[(_local_15 - 8)]) ^ _local_3[(_local_15 - 14)]) ^ _local_3[(_local_15 - 16)]), 1);
                    };
                    _local_16 = safe_add(safe_add(rol(_local_4, 5), sha1_ft(_local_15, _local_5, _local_6, _local_7)), safe_add(safe_add(_local_8, _local_3[_local_15]), sha1_kt(_local_15)));
                    _local_8 = _local_7;
                    _local_7 = _local_6;
                    _local_6 = rol(_local_5, 30);
                    _local_5 = _local_4;
                    _local_4 = _local_16;
                    _local_15++;
                };
                _local_4 = safe_add(_local_4, _local_10);
                _local_5 = safe_add(_local_5, _local_11);
                _local_6 = safe_add(_local_6, _local_12);
                _local_7 = safe_add(_local_7, _local_13);
                _local_8 = safe_add(_local_8, _local_14);
                _local_9 = (_local_9 + 16);
            };
            return [_local_4, _local_5, _local_6, _local_7, _local_8];
        }

        function sha1_ft(_arg_1,_arg_2, _arg_3, _arg_4)
        {
            if (_arg_1 < 20)
            {
                return ((_arg_2 & _arg_3) | ((~(_arg_2)) & _arg_4));
            };
            if (_arg_1 < 40)
            {
                return ((_arg_2 ^ _arg_3) ^ _arg_4);
            };
            if (_arg_1 < 60)
            {
                return (((_arg_2 & _arg_3) | (_arg_2 & _arg_4)) | (_arg_3 & _arg_4));
            };
            return ((_arg_2 ^ _arg_3) ^ _arg_4);
        }

        function sha1_kt(_arg_1)
        {
            return ((_arg_1 < 20) ? 1518500249 : ((_arg_1 < 40) ? 1859775393 : ((_arg_1 < 60) ? -1894007588 : -899497514)));
        }

        function safe_add(_arg_1,_arg_2)
        {
            var _local_3 = ((_arg_1 & 0xFFFF) + (_arg_2 & 0xFFFF));
            var _local_4 = (((_arg_1 >> 16) + (_arg_2 >> 16)) + (_local_3 >> 16));
            return ((_local_4 << 16) | (_local_3 & 0xFFFF));
        }

        function rol(_arg_1, _arg_2)
        {
            return ((_arg_1 << _arg_2) | (_arg_1 >>> (32 - _arg_2)));
        }

        function str2binb(_arg_1)
        {
			//was an array
            var _local_2 = {};
            var _local_3 = ((1 << 8) - 1);
            var _local_4 = 0;
            while (_local_4 < (_arg_1.length * 8))
            {
                _local_2[(_local_4 >> 5)] = (_local_2[(_local_4 >> 5)] | ((_arg_1.charCodeAt((_local_4 / 8)) & _local_3) << (24 - (_local_4 % 32))));
                _local_4 = (_local_4 + 8);
            };
            return (_local_2);
        }

        function binb2hex(_arg_1)
        {
            var _local_2 = "";
            var _local_3 = "0123456789abcdef";
            var _local_4 = 0;
            while (_local_4 < (_arg_1.length * 4))
            {
                _local_2 = (_local_2 + (_local_3.charAt(((_arg_1[(_local_4 >> 2)] >> (((3 - (_local_4 % 4)) * 8) + 4)) & 0x0F)) + _local_3.charAt(((_arg_1[(_local_4 >> 2)] >> ((3 - (_local_4 % 4)) * 8)) & 0x0F))));
                _local_4++;
            };
            return (_local_2);
        }
module.exports = 
{
	create: create
};